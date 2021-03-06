<template>
  <div
    :id="`paint-canvas-container-${storeName}`"
    :class="['content, paint-canvas-container', {'mouse-inactive': canvas.mouseInactive}]"
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
      storeName: String
    },
    computed: {
      colors() {
        return this.storeName ? this.$store.getters[this.storeName+'/colors'] : undefined
      },
      tools() {
        return this.storeName ? this.$store.getters[this.storeName+'/tools'] : undefined
      },
      canvasContainerSize() {
        const canvasContainer = document.getElementById(`paint-canvas-container-${this.storeName}`);

        return {
          width: canvasContainer.offsetWidth | 0,
          height: canvasContainer.offsetHeight | 0
        }
      }
    },
    methods: {
      loader() {
        const self = this;

        if (this.canvas.loaded) return;

        this.config = (p) => {

          p.setup = () => {
            self.canvas.loaded = true;

            const canvasP5 = p.createCanvas(this.canvasContainerSize.width, this.canvasContainerSize.height);

            p.frameRate = this.canvas.frameRate;

            canvasP5.parent(`paint-canvas-container-${this.storeName}`);
            canvasP5.id(`paint-canvas-${this.storeName}`);

            canvasP5.mouseClicked(() => {
              self.$store.dispatch(`${this.storeName}/closeColorPickers`);
            });

            canvasP5.mousePressed(() => {
              self.canvas.focus = true;

              self.$store.dispatch(`${this.storeName}/closeToolPanel`);
            });

            canvasP5.mouseReleased(() => {
              self.canvas.focus = false;
            });

            p.fill(this.colors.color2.value);
            p.rect(-10, -10, this.canvasContainerSize.width + 20, this.canvasContainerSize.height + 20);
          };

          p.draw = () => {
            if (!this.canvas.focus) return;

            if (p.mouseIsPressed && p.mouseButton === p.LEFT) {
              if (self.tools.active === 'square') {
                p.noStroke();
                p.fill(self.colors.color1.value);
                p.rect(
                  p.mouseX - (self.tools.square.size/2),
                  p.mouseY - (self.tools.square.size/2),
                  self.tools.square.size,
                  self.tools.square.size
                )
              }

              if (self.tools.active === 'ellipse') {
                p.stroke(self.colors.color1.value);
                p.strokeWeight(self.tools.ellipse.size);
                p.line(
                  p.mouseX,
                  p.mouseY,
                  p.pmouseX,
                  p.pmouseY
                )
              }

              if (self.tools.active === 'marker') {
                p.noStroke();
                p.stroke(self.colors.color1.value);
                p.line(p.mouseX - 4, p.mouseY - 5, p.mouseX + 4, p.mouseY + 6)
              }
            }
          };
        };

        this.initialize = () => {
          this.canvas.instance = new p5(this.config);
        };

        this.initialize();
      }
    },
    mounted() {
      // todo fix this
      setTimeout(() => this.loader(), 100)

      this.$store.subscribe((mutation) => {
        /**
         * New canvas
         */
        if (mutation.type === `${this.storeName}/NEW_FILE`) {
          this.$store.dispatch(`${this.storeName}/closeColorPickers`);

          if (this.canvas) {
            const p = this.canvas.instance;

            if (!p) return

            p.fill(this.colors.color2.value);
            p.rect(-10, -10, this.canvasContainerSize.width + 20, this.canvasContainerSize.height + 20);
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
    }
  }
</script>
