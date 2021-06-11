<template>
  <v-btn
    tile
    :min-width="28"
    :height="28"
    class="pa-0 mr-1 mb-1"
    v-ripple="'rgba(255, 255, 255, 0.1)'"
    @click="$store.commit(`${storeName}/NEW_FILE`)"
  >
    <v-icon size="17" style="margin-top: -2px">mdi-file</v-icon>
  </v-btn>
</template>

<script>
  export default {
    props: {
      storeName: String
    }
  }
</script>