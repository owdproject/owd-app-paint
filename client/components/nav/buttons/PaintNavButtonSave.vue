<template>
  <v-btn
      tile
      :min-width="28"
      :height="28"
      class="pa-0 mb-1"
      v-ripple="'rgba(255, 255, 255, 0.1)'"
      @click="$store.commit(`${storeName}/SAVE_FILE`)"
    >
      <v-icon size="18" style="margin-top: -1px">mdi-content-save</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    storeName: String
  }
}
</script>