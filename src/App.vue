<script>
import axios from "axios";
import showdown from "showdown";
import DisplayFile from "./components/DisplayFile.vue";
const converter = new showdown.Converter();
export default {
  name: "App",
  data: () => ({
    files: [],
    newFile: "",
    displayFile: "",
  }),
  components: {
    DisplayFile,
  },
  mounted() {
    this.getFiles();
  },
  methods: {
    reset() {
      this.newFile = "";
    },
    editFile(e) {
      e.preventDefault();
      const files = e.target.files;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      this.newFile = files[0];
    },
    getFiles() {
      axios.get("http://localhost:5000/api/").then((res) => {
        const text = res.data;
        const html = converter.makeHtml(text);
        this.displayFile = html;
      });
    },
    submitFile() {
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
        .catch((err) => {
          console.log(err);
        });
      this.reset();
    },
  },
};
</script>

<template>
  <main>
    <div class="row">
      <header>
        <h1>Oh for <code>fs</code> sake...</h1>
      </header>
      <h2>Upload File</h2>

      <input
        type="file"
        name="newFile"
        accept=" .md, .pdf"
        @change="editFile"
      />
      <button v-on:click="submitFile">SUBMIT</button>
    </div>
    <DisplayFile :file="{ displayFile }" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 40px;
}
h2 {
  color: #55ffdd;
}

input {
  border: 1px solid #11cc99;
  margin-right: 32px;
  padding: 4px;
  border-radius: 4px;
}
button {
  border-radius: 4px;
  border: none;
  background: #44ffcc;
  color: #212121;
  letter-spacing: 2px;
  font-size: 18px;
  width: 100px;
  height: 40px;
  box-shadow: 0px 4px 0px #11cc99;
  transition: 0.2s;
}
button:hover {
  background: #55ffdd;
  cursor: pointer;
  transition: 0.2s;
}
button:active {
  box-shadow: none;
  transform: translateY(4px);
}
</style>
