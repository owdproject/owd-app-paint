<template>
  <div :class="['button button-ellipse', {active: tools.active === 'ellipse'}]">
    <div
      class="button-inner"
      v-ripple="'rgba(255, 255, 255, 0.1)'"
      @click="$store.dispatch('paint/setCurrentTool', 'ellipse')"
    >
      <v-icon>mdi-circle</v-icon>
    </div>

    <div class="panel" v-show="tools.ellipse.menuActive">
      <input
        v-model="size"
        @mouseup="$store.dispatch('paint/setCurrentTool', 'ellipse')"
        type="range" min="2.5" max="72" step="2.5"
      />
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "PaintNavButtonEllipse",
    data() {
      return  {
        size: 5
      }
    },
    computed: {
      ...mapGetters({
        tools: 'paint/tools'
      })
    },
    watch: {
      size: function(val) {
        clearTimeout(this.timeoutChange);

        this.timeoutChange = setTimeout(() => {
          this.$store.commit('paint/SET_TOOL', {
            ellipse: {
              size: val,
              menuActive: false
            }
          });
        }, 250)
      }
    },
    mounted() {
      this.size = this.tools.ellipse.size;
    }
  }
</script>
