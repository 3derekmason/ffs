<script>
import axios from "axios";
export default {
  name: "App",
  data: () => ({
    files: [],
    newFile: "",
  }),
  methods: {
    editFile(e) {
      e.preventDefault();
      const files = e.target.files;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      this.newFile = files[0];
    },
    sendfile(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append("file", this.newFile);
      axios
        .post("http://localhost:5000/files", formData)
        .then((response) => {
          response.data.success
            ? alert("File successfully uploaded")
            : alert("File already exists");
        })
        .catch((err) => alert("Error: " + err));
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
    <form enctype="multipart/form-data" @submit="sendFile">
      <input
        type="file"
        name="newFile"
        accept="image/*, .md, .pdf"
        @change="editFile"
      />
      <button type="submit">UPLOAD</button>
    </form>
  </main>
</template>

<style scoped></style>
