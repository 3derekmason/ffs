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
    submitFile() {
      console.log("hi");
      let formData = new FormData();

      formData.append("file", this.newFile);

      axios
        .post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
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

    <input
      type="file"
      name="newFile"
      accept="image/*, .md, .pdf"
      @change="editFile"
    />
    <button v-on:click="submitFile">UPLOAD</button>
  </main>
</template>

<style scoped></style>
