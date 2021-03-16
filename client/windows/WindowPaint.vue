<template>
  <Window :window="window">
    <div :class="`paint-container paint-container-${window.uniqueName}`">
      <div>
        <PaintNav :storeName="window.uniqueName" />
      </div>
      <div>
        <PaintCanvas :storeName="window.uniqueName" />
      </div>
    </div>
  </Window>
</template>

<script>
  import Window from "@owd-client/core/src/components/window/Window";
  import PaintCanvas from "../components/canvas/PaintCanvas";
  import PaintNav from "../components/nav/PaintNav";

  export default {
    components: {
      PaintNav,
      PaintCanvas,
      Window
    },
    props: {
      window: Object
    }
  }
</script>

<style lang="scss">
  .owd-window-paint {
    user-select: none;
    height: 100%;

    canvas {
      position: absolute;
      cursor: cell;
    }

    .paint-container {
      display: grid;
      grid-template-columns: 58px calc(100% - 58px);
      height: 100%;

      > div {
        position: relative;
      }
    }

    .paint-canvas-container {
      position: relative;
      overflow: hidden;
      margin-left: 12px;
      height: 100%;
    }
  }
  .vc-compact {
    width: 245px;
  }
  .vc-compact-dot {
    display: none;
  }
</style>
