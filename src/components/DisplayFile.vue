<template>
  <div v-html="file.displayFile"></div>
</template>

<script>
export default {
  props: {
    file: String,
  },
};
</script>

<style scoped>
div {
  overflow: auto;
}
</style>
