<template>
  <Window :title="data.title" :window="data">
    <div :class="`paint-container paint-container-${data.index}`">
      <div>
        <PaintNav :store-name="storeName" />
      </div>
      <div>
        <PaintCanvas :store-name="storeName" :loadTrigger="canvasLoadTrigger" />
      </div>
    </div>
  </Window>
</template>

<script>
  import Window from "@owd-client/core/src/components/window/Window";
  import PaintCanvas from "../components/canvas/PaintCanvas";
  import PaintNav from "../components/nav/PaintNav";

  export default {
    name: "WindowPaint",
    components: {
      PaintNav,
      PaintCanvas,
      Window
    },
    data() {
      return {
        storeName: `${this.data.module.moduleInfo.name}-${this.data.uniqueID}`,
        canvasLoadTrigger: false
      }
    },
    props: {
      data: Object
    },
    watch: {
      // when window opens or closes
      'data.storage.closed': function (val) {
        if (val === false) this.canvasLoadTrigger = true;
      }
    },
    mounted() {
      if (!this.data.storage.closed) this.canvasLoadTrigger = true;
    }
  }
</script>

<style lang="scss">
  .window-paint {
    user-select: none;
    height: 100%;

    canvas {
      position: absolute;
      cursor: cell;
    }

    .paint-container {
      display: grid;
      grid-template-columns: 56px calc(100% - 56px);
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
