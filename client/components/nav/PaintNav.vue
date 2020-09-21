<template>
  <div class="paint-nav">

    <div class="paint-nav-buttons">

      <div class="button">
        <div
          class="button-inner"
          v-ripple="'rgba(255, 255, 255, 0.1)'"
          @click="$store.commit('paint/NEW_FILE')"
        >
          <v-icon>mdi-file</v-icon>
        </div>
      </div>

      <div class="button">
        <div
          class="button-inner"
          v-ripple="'rgba(255, 255, 255, 0.1)'"
          @click="$store.commit('paint/SAVE_FILE')"
        >
          <v-icon>mdi-content-save</v-icon>
        </div>
      </div>

      <PaintNavButtonSquare />

      <PaintNavButtonEllipse />

      <PaintNavColors />

    </div>

  </div>
</template>

<script>
  import PaintNavColors from "./PaintNavColors";
  import PaintNavButtonSquare from "./PaintNavButtonSquare";
  import PaintNavButtonEllipse from "./PaintNavButtonEllipse";
  export default {
    name: "PaintNav",
    components: {PaintNavButtonSquare, PaintNavButtonEllipse, PaintNavColors}
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
