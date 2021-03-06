<template>
  <div class="paint-nav-colors">
    <!-- color 1 -->
    <div
      :class="['color color-1', {active: colors.color1.picker}]"
      @click="togglePickerColor1"
    >
      <div class="color-preview" :style="`background-color: ${rgbColor1}`" />
      <div class="color-picker">
        <ColorPicker :value="pickerColor1" @input="updateColor1" />
      </div>
    </div>

    <!-- color 2 -->
    <div
      :class="['color color-2', {active: colors.color2.picker}]"
      @click="togglePickerColor2"
    >
      <div class="color-preview" :style="`background-color: ${rgbColor2}`" />
      <div class="color-picker">
        <ColorPicker :value="pickerColor2" @input="updateColor2" />
      </div>
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
  import compact from 'vue-color/src/components/Compact.vue'

  export default {
    components: {
      ColorPicker: compact
    },
    data() {
      return {
        pickerColor1: [0,0,0],
        pickerColor2: [0,0,0],
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
        return 'rgb(' + this.colors.color1.value.join(',') + ')';
      },
      rgbColor2() {
        return 'rgb(' + this.colors.color2.value.join(',') + ')';
      }
    },
    methods: {
      togglePickerColor1() {
        this.$store.dispatch(`${this.storeName}/closeToolPanel`);
        this.$store.commit(`${this.storeName}/SET_COLOR_1`, { picker: !this.colors.color1.picker });
        this.$store.commit(`${this.storeName}/SET_COLOR_2`, { picker: false });
      },
      togglePickerColor2() {
        this.$store.dispatch(`${this.storeName}/closeToolPanel`);
        this.$store.commit(`${this.storeName}/SET_COLOR_2`, { picker: !this.colors.color2.picker });
        this.$store.commit(`${this.storeName}/SET_COLOR_1`, { picker: false });
      },
      updateColor1(color) {
        this.$store.dispatch(`${this.storeName}/closeToolPanel`);

        this.$store.commit(`${this.storeName}/SET_COLOR_1`, {
          value: [color.rgba.r, color.rgba.g, color.rgba.b]
        });
      },
      updateColor2(color) {
        this.$store.dispatch(`${this.storeName}/closeToolPanel`);

        this.$store.commit(`${this.storeName}/SET_COLOR_2`, {
          value: [color.rgba.r, color.rgba.g, color.rgba.b]
        });
      },
      colorInvert() {
        this.$store.dispatch(`${this.storeName}/closeToolPanel`);
        this.$store.dispatch(`${this.storeName}/closeColorPickers`);

        const color1 = this.colors.color1.value;
        const color2 = this.colors.color2.value;

        this.$store.commit(`${this.storeName}/SET_COLOR_1`, { value: color2 });
        this.$store.commit(`${this.storeName}/SET_COLOR_2`, { value: color1 });
      },
      setDefaultColors() {
        this.$store.dispatch(`${this.storeName}/closeToolPanel`);
        this.$store.dispatch(`${this.storeName}/closeColorPickers`);

        this.$store.commit(`${this.storeName}/SET_COLOR_1`, {
          value: [0, 0, 0]
        });
        this.$store.commit(`${this.storeName}/SET_COLOR_2`, {
          value: [255, 255, 255]
        });
      }
    }
  }
</script>

<style scoped lang="scss">
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
        display: none;
        position: absolute;
        bottom: 0;
        left: 48px;
        z-index: 3;
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
      overflow: hidden;

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
        color: #CCC;

        &.mdi-subdirectory-arrow-left {
          font-size: 16px;
          top: -1px;
          right: -4px;
          transform: rotateZ(-90deg);
        }

        &.mdi-subdirectory-arrow-right {
          font-size: 16px;
          top: -5px;
          right: -1px;
          transform: rotateZ(180deg);
        }
      }
    }
  }
</style>
