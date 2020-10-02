<template>
  <div
    :id="`paint-canvas-container-${storeName}`"
    :class="['content, paint-canvas-container', {'mouse-inactive': canvas.mouseInactive}]"
  />
</template>

<script>
  import p5 from 'p5';

  export default {
    name: "PaintCanvas",
    data() {
      return {
        canvas: {
          instance: null,
          loaded: false,
          focus: false,
          frameRate: 50,
          size: {
            width: screen.width,
            height: screen.height,
          },
          mouseInactive: false,
          cleanup: {
            active: false
          },
        },
      }
    },
    props: {
      loadTrigger: Boolean,
      storeName: String
    },
    watch: {
      loadTrigger: function(val) {
        if (val === true) this.loader();
      }
    },
    computed: {
      colors() {
        return this.storeName ? this.$store.getters[this.storeName+'/colors'] : undefined
      },
      tools() {
        return this.storeName ? this.$store.getters[this.storeName+'/tools'] : undefined
      },
    },
    methods: {
      loader() {
        const self = this;

        if (this.canvas.loaded) return;

        this.config = (p) => {

          p.setup = () => {
            this.canvas.loaded = true;

            const canvasP5 = p.createCanvas(this.canvas.size.width, this.canvas.size.height);

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

            this.$nextTick(() => {
              self.$store.commit(`${this.storeName}/NEW_FILE`)
            })
          };

          p.draw = () => {
            if (this.canvas.cleanup.active) {
              // clear draw when cleanup is active
              return self.fadeNewFile(p);
            }

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

        this.fadeNewFile = (p) => {
          const canvasContainerSize = this.canvasContainerSize();

          let squareSize = canvasContainerSize.width / 10;

          for (let x = 0; x < canvasContainerSize.width; x += squareSize) {
            for (let y = 0; y < canvasContainerSize.height; y += squareSize) {
              p.fill(this.colors.color2.value[0], this.colors.color2.value[1], this.colors.color2.value[2], 40 * p.noise(1 * (10 * p.frameCount + x), 0.01 * y) + 15);

              p.noStroke();
              p.rect(x, y, squareSize, squareSize);
            }
          }
        };

        this.initialize = () => {
          this.canvas.instance = new p5(this.config);
        };

        this.initialize();
      },

      canvasContainerSize() {
        const canvasContainer = document.getElementById(`paint-canvas-container-${this.storeName}`);

        return {
          width: canvasContainer.offsetWidth | 0,
          height: canvasContainer.offsetHeight | 0
        }
      }
    },
    mounted() {
      this.$store.subscribe((mutation) => {
        /**
         * New canvas
         */
        if (mutation.type === `${this.storeName}/NEW_FILE`) {
          this.$store.dispatch(`${this.storeName}/closeColorPickers`);

          if (this.canvas) {
            const p = this.canvas.instance;

            if (!p) return

            this.canvas.cleanup.active = true;
            this.canvas.mouseInactive = true;

            setTimeout(() => {
              this.canvas.cleanup.active = false;
              this.canvas.mouseInactive = false;

              p.fill(this.colors.color2.value);
              p.rect(0, 0, screen.width, screen.height);
            }, 1000);

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
