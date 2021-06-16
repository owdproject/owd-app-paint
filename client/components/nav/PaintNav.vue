<template>
  <div class="paint-nav">

    <div class="paint-nav-buttons">

      <PaintNavButtonNewFile :store-name="storeName" />
      <PaintNavButtonSave :store-name="storeName" />

      <PaintNavButtonSquare :store-name="storeName" />
      <PaintNavButtonEllipse :store-name="storeName" />

      <PaintNavColors :store-name="storeName" />

    </div>

  </div>
</template>

<script>
  import PaintNavColors from "./colors/PaintNavColors.vue";
  import PaintNavButtonSquare from "./buttons/PaintNavButtonSquare.vue";
  import PaintNavButtonEllipse from "./buttons/PaintNavButtonEllipse.vue";
  import PaintNavButtonNewFile from "./buttons/PaintNavButtonNewFile.vue";
  import PaintNavButtonSave from "./buttons/PaintNavButtonSave.vue";
  export default {
    components: {PaintNavButtonSave, PaintNavButtonNewFile, PaintNavButtonSquare, PaintNavButtonEllipse, PaintNavColors},
    props: {
      // store name instance
      storeName: String
    }
  }
</script>

<style lang="scss">
  .paint-nav {
    position: relative;
    height: 100%;

    .paint-nav-buttons {
      cursor: pointer;

      .panel {
        z-index: 1;
        position: absolute;
        top: -1px;
        left: 31px;
        width: 110px;
        height: 28px;
        border-radius: 2px;
        box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
        background-color: $owd-window-background;

        input[type="range"] {
          max-width: 80px;
          vertical-align: -2px;
          -webkit-appearance: none;

          @-moz-document url-prefix() {
            -webkit-appearance: auto;
            vertical-align: -4px;
          }

          &::-webkit-slider-runnable-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: $owd-window-button-icon-color;
            border-radius: 2px;
          }

          &::-webkit-slider-thumb {
            width: 12px;
            height: 12px;
            border-radius: 16px;
            background: $owd-window-button-icon-color;
            cursor: pointer;
            margin-top: -4.5px;
          }

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
          }
        }
      }
    }
  }
</style>
