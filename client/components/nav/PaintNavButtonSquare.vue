<template>
  <div :class="['button button-square', {active: tools.square.active === 'square'}]">
    <div
      class="button-inner" v-ripple
      @click="$store.dispatch('paint/setCurrentTool', 'square')"
    >
      <v-icon>mdi-square</v-icon>
    </div>

    <div class="panel" v-show="tools.square.menuActive">
      <input
        v-model="size"
        @mouseup="$store.dispatch('paint/setCurrentTool', 'square')"
        type="range" min="2.5" max="72" step="2.5"
      />
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "PaintNavButtonSquare",
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
            square: {
              size: val,
              menuActive: false
            }
          });
        }, 250)
      }
    },
    mounted() {
      this.size = this.tools.square.size;
    }
  }
</script>
