<template>
  <v-btn
    tile
    :min-width="28"
    :height="28"
    class="pa-0 mb-1"
    @click="$store.dispatch(`${storeName}/setCurrentTool`, 'ellipse')"
  >
    <v-icon size="17" style="margin-top: 2px; margin-left: 1px;">mdi-circle</v-icon>

    <div class="panel" v-show="tools.ellipse.menuActive">
      <input
          v-model="size"
          @mouseup="updateToolSize"
          type="range" min="2.5" max="72" step="2.5"
      />
    </div>
  </v-btn>
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
