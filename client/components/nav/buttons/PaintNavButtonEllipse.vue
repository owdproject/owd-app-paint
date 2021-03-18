<template>
  <div :class="['button button-ellipse', {active: tools.active === 'ellipse'}]">
    <div
      class="button-inner" v-ripple
      @click="$store.dispatch(`${storeName}/setCurrentTool`, 'ellipse')"
    >
      <v-icon>mdi-circle</v-icon>
    </div>

    <div class="panel" v-show="tools.ellipse.menuActive">
      <input
        v-model="size"
        @mouseup="updateToolSize"
        type="range" min="2.5" max="72" step="2.5"
      />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return  {
        size: 5
      }
    },
    props: {
      // store name instance
      storeName: String
    },
    computed: {
      tools() {
        return this.storeName ? this.$store.getters[this.storeName+'/tools'] : undefined
      }
    },
    methods: {
      updateToolSize() {
        this.$store.dispatch(`${this.storeName}/setCurrentTool`, 'ellipse')

        this.$store.commit(`${this.storeName}/SET_TOOL`, {
          ellipse: {
            size: this.size,
            menuActive: false
          }
        });
      }
    },
    mounted() {
      this.size = this.tools.ellipse.size;
    }
  }
</script>

<style scoped lang="scss">
i {
  position: relative;
  top: -2px;
}
</style>
