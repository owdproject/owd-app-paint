<template>
  <WindowApp :window="props.window">
    <div :class="`paint-container paint-container-${props.window.uniqueName}`">
      <div>
        <PaintNav :storeName="props.window.uniqueName" />
      </div>
      <div>
        <PaintCanvas :storeName="props.window.uniqueName" />
      </div>
    </div>
  </WindowApp>
</template>

<script setup>
  import PaintCanvas from "../components/canvas/PaintCanvas.vue";
  import PaintNav from "../components/nav/PaintNav.vue";
  import {defineProps} from "vue";

  const props = defineProps({
    window: Object
  })
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
      grid-template-columns: 60px calc(100% - 60px);
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
</style>
