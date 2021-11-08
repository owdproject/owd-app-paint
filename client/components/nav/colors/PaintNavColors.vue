<template>
  <div class="paint-nav-colors">
    <!-- color 1 -->
    <div
      :class="['color color-1', {active: colors.color1.picker}]"
    >
      <div
        class="color-preview"
        :style="`background-color: ${rgbColor1}`"
      />
      <input type="color" class="color-picker" ref="colorPicker1" :value="rgbColor1" />
    </div>

    <!-- color 2 -->
    <div
      :class="['color color-2', {active: colors.color2.picker}]"
    >
      <div
        class="color-preview"
        :style="`background-color: ${rgbColor2}`"
      />
      <input type="color" class="color-picker" ref="colorPicker2" :value="rgbColor2" />
    </div>

    <!-- invert color -->
    <div class="color-invert" @click="colorInvert">
      <v-icon>mdi-subdirectory-arrow-left</v-icon>
      <v-icon>mdi-subdirectory-arrow-right</v-icon>
    </div>

    <!-- set as default -->
    <div class="color-defaults" @click="setDefaultColors" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        colorPicker1: null,
        colorPicker2: null
      }
    },
    props: {
      // store name instance
      storeName: String
    },
    computed: {
      colors() {
        return this.storeName ? this.$store.getters[this.storeName+'/colors'] : undefined
      },
      tools() {
        return this.storeName ? this.$store.getters[this.storeName+'/tools'] : undefined
      },
      rgbColor1() {
        return this.colors.color1.value;
      },
      rgbColor2() {
        return this.colors.color2.value;
      }
    },
    mounted() {
      const self = this;

      this.$refs.colorPicker1.addEventListener('change', function(color) {
        self.$store.commit(`${self.storeName}/SET_COLOR_1`, { value: color.target.value });
      })
      this.$refs.colorPicker2.addEventListener('change', function(color) {
        self.$store.commit(`${self.storeName}/SET_COLOR_2`, { value: color.target.value });
      })
    },
    methods: {
      colorInvert() {
        const color1 = this.colors.color1.value;
        const color2 = this.colors.color2.value;

        this.$store.commit(`${this.storeName}/SET_COLOR_1`, { value: color2 });
        this.$store.commit(`${this.storeName}/SET_COLOR_2`, { value: color1 });
      },
      setDefaultColors() {
        this.$store.commit(`${this.storeName}/SET_COLOR_1`, {
          value: '#000000'
        });
        this.$store.commit(`${this.storeName}/SET_COLOR_2`, {
          value: '#FFFFFF'
        });
      }
    }
  }
</script>

<style lang="scss">
  .paint-nav-colors {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    .color {
      position: relative;
      height: 32px;

      &.color-1 {
        width: 40px;
        z-index: 1;
      }

      &.color-2 {
        width: 40px;
        float: right;
        margin-top: -16px;
      }

      .color-picker {
        position: absolute;
        top: 0;
        left: 0;
        border: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      .color-preview {
        height: 32px;
      }

      &.active {
        .color-picker {
          display: block;
        }
      }
    }

    .color-defaults {
      cursor: pointer;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 14px;
      height: 14px;
      &:before {
        position: absolute;
        bottom: 3px;
        left: 1px;
        width: 6px;
        height: 6px;
        background: black;
        border: 1px solid #EEE;
        z-index: 1;
        content: '';
      }

      &:after {
        position: absolute;
        bottom: -1px;
        left: 4px;
        width: 7px;
        height: 7px;
        background: white;
        border: 1px solid black;
        content: '';
      }
    }

    .color-invert {
      cursor: pointer;
      position: absolute;
      bottom: 34px;
      right: 0;
      width: 13px;
      height: 14px;

      .v-icon {
        position: absolute;
        color: $owd-window-button-icon-color;

        &.mdi-subdirectory-arrow-left {
          font-size: 16px;
          top: -2px;
          right: -5px;
          transform: rotateZ(-90deg);
        }

        &.mdi-subdirectory-arrow-right {
          font-size: 16px;
          top: -5px;
          right: -3px;
          transform: rotateZ(180deg);
        }
      }
    }
  }
</style>
