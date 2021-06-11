<template>
  <v-btn
    tile
    :min-width="28"
    :height="28"
    class="pa-0 mr-1 mb-1"
    @click="$store.dispatch(`${storeName}/setCurrentTool`, 'square')"
  >
    <v-icon size="16" style="vertical-align: -1px">mdi-square</v-icon>

    <div class="panel" v-show="tools.square.menuActive">
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
        this.$store.dispatch(`${this.storeName}/setCurrentTool`, 'square')

        this.$store.commit(`${this.storeName}/SET_TOOL`, {
          square: {
            size: this.size,
            menuActive: false
          }
        });
      }
    },
    mounted() {
      this.size = this.tools.square.size;
    }
  }
</script>
