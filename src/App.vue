<script>
export default {
  name: "App",
  data: () => ({
    files: [],
    newFile: "",
  }),
  methods: {
    sendFile(e) {
      e.preventDefault();
      console.log(this.newFile);
    },
    editFile(e) {
      e.preventDefault();
      this.newFile = e.target.files[0];
    },
  },
};
</script>

<template>
  <header>
    <h1>Oh for <code>fs</code> sake...</h1>
  </header>

  <main>
    <h1>Upload Image</h1>
    <form @submit="sendFile">
      <input
        type="file"
        name="newFile"
        accept="image/*, .md"
        @change="editFile"
      />
      <button type="submit">UPLOAD</button>
    </form>
  </main>
</template>

<style scoped></style>
