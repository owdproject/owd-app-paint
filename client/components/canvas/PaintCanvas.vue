<template>
  <div
    :id="`paint-canvas-container-${storeName}`"
    :class="['paint-canvas-container', {'mouse-inactive': canvas.mouseInactive}]"
    v-click-outside="canvas.focus = false"
  />
</template>

<script>
  import p5 from 'p5';

  export default {
    data() {
      return {
        canvas: {
          instance: null,
          loaded: false,
          focus: false,
          frameRate: 60,
          mouseInactive: false
        },
      }
    },
    props: {
      storeName: String,
    },
    computed: {
      colors() {
        return this.storeName ? this.$store.getters[this.storeName+'/colors'] : undefined
      },
      tools() {
        return this.storeName ? this.$store.getters[this.storeName+'/tools'] : undefined
      }
    },
    methods: {
      /**
       * Get current container canvas size
       */
      canvasContainerSize() {
        const canvasContainer = document.getElementById(`paint-canvas-container-${this.storeName}`);

        return {
          width: canvasContainer.offsetWidth | 382,
          height: canvasContainer.offsetHeight | 252
        }
      },
      /**
       * Initialize p5.js canvas
       */
      canvasInitialize(p5) {
        const self = this;

        p5.setup = () => {
          self.canvas.loaded = true;

          const canvasContainerSize = self.canvasContainerSize()
          const canvas = p5.createCanvas(canvasContainerSize.width, canvasContainerSize.height);

          p5.frameRate = this.canvas.frameRate;

          canvas.parent(`paint-canvas-container-${this.storeName}`);
          canvas.id(`paint-canvas-${this.storeName}`);

          canvas.mouseClicked(() => {
            self.$store.dispatch(`${this.storeName}/closeColorPickers`);
          });

          canvas.mousePressed(() => {
            self.canvas.focus = true;

            self.$store.dispatch(`${this.storeName}/closeToolPanel`);
          });

          canvas.mouseReleased(() => {
            self.canvas.focus = false;
          });

          self.canvasClear(p5)
        };

        p5.draw = () => {
          if (!this.canvas.focus) return;

          if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
            if (self.tools.active === 'square') {
              p5.noStroke();
              p5.fill(self.colors.color1.value);
              p5.rect(
                  p5.mouseX - (self.tools.square.size/2),
                  p5.mouseY - (self.tools.square.size/2),
                  self.tools.square.size,
                  self.tools.square.size
              )
            }

            if (self.tools.active === 'ellipse') {
              p5.stroke(self.colors.color1.value);
              p5.strokeWeight(self.tools.ellipse.size);
              p5.line(
                  p5.mouseX,
                  p5.mouseY,
                  p5.pmouseX,
                  p5.pmouseY
              )
            }

            if (self.tools.active === 'marker') {
              p5.noStroke();
              p5.stroke(self.colors.color1.value);
              p5.line(p5.mouseX - 4, p5.mouseY - 5, p5.mouseX + 4, p5.mouseY + 6)
            }
          }
        };
      },
      /**
       * Clear canvas
       */
      canvasClear(p5) {
        const canvasContainerSize = this.canvasContainerSize()
        p5.resizeCanvas(canvasContainerSize.width, canvasContainerSize.height)

        p5.clear()
        p5.fill(this.colors.color2.value);
        p5.rect(-10, -10, canvasContainerSize.width + 20, canvasContainerSize.height + 20);
      }
    },
    mounted() {
      const self = this;

      // initialize p5.js canvas
      this.canvas.instance = new p5(this.canvasInitialize);

      this.$store.subscribe((mutation) => {
        /**
         * New canvas
         */
        if (mutation.type === `${this.storeName}/NEW_FILE`) {
          this.$store.dispatch(`${this.storeName}/closeColorPickers`);

          if (this.canvas) {
            self.canvasClear(this.canvas.instance)
          }
        }

        /**
         * Save canvas as file
         */
        if (mutation.type === `${this.storeName}/SAVE_FILE`) {
          let anonNumber = parseInt((9999 * Math.floor(Math.random() * 9999) / 9999).toString());
          const anonNumberZerosToAdd = 4 - anonNumber.toString().length;

          anonNumber = anonNumber.toString();

          for (let i = 0; i < anonNumberZerosToAdd; i++) {
            anonNumber = '0' + anonNumber;
          }

          const filename = prompt('Filename', `art-${anonNumber}.png`);
          if (filename) {
            this.canvas.instance.save(filename);
          }
        }
      });
    },
    beforeUnmount() {
      this.canvas.instance.remove()
    }
  }
</script>