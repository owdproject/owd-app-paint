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
  import PaintNavColors from "./colors/PaintNavColors";
  import PaintNavButtonSquare from "./buttons/PaintNavButtonSquare";
  import PaintNavButtonEllipse from "./buttons/PaintNavButtonEllipse";
  import PaintNavButtonNewFile from "@/modules/paint/components/nav/buttons/PaintNavButtonNewFile";
  import PaintNavButtonSave from "@/modules/paint/components/nav/buttons/PaintNavButtonSave";
  export default {
    name: "PaintNav",
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

      .button {
        position: relative;
        float: left;
        text-align: center;
        width: 26px;
        height: 26px;
        line-height: 27px;
        margin: 0 0 4px 0;
        border-radius: 3px;
        background: #1f1f1f;

        &:nth-child(odd) {
          margin-right: 4px;
        }

        &.active {
          background: #252525;
          color: white;
        }

        .panel {
          z-index: 1;
          position: absolute;
          top: 0;
          left: 35px;
          width: 110px;
          border-radius: 2px;
          box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
          background-color: #fff;

          input[type="range"] {
            max-width: 80px;
            vertical-align: 3px;
            -webkit-appearance: none;

            &::-webkit-slider-runnable-track {
              width: 100%;
              height: 3px;
              cursor: pointer;
              background: #CCC;
              border-radius: 2px;
            }

            &::-webkit-slider-thumb {
              width: 12px;
              height: 12px;
              border-radius: 16px;
              background: #333;
              cursor: pointer;
              margin-top: -4.5px;
            }

            &::-webkit-slider-thumb {
              -webkit-appearance: none;
            }
          }
        }

        .v-icon {
          font-size: 16px;
          vertical-align: -2px;
          color: #CCC;

          &.mdi-format-color-fill {
            font-size: 18px;
            vertical-align: -5px;
          }

          &.mdi-file {
            font-size: 16px;
          }

          &.mdi-content-save {
            font-size: 16px;
            vertical-align: -1px;
          }

          &.mdi-pencil {
            vertical-align: -2px;
          }
        }
      }
    }
  }
</style>
