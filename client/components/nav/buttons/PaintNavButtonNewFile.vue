<template>
  <div class="button">
    <div
        class="button-inner"
        v-ripple="'rgba(255, 255, 255, 0.1)'"
        @click="$store.commit(`${storeName}/NEW_FILE`)"
    >
      <v-icon>mdi-file</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      storeName: String
    }
  }
</script>