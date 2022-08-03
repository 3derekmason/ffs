# Oh for `fs` sake...

### Overview

## PART I: Upload file locally:

##### /src/api/index.js

```js
// require the installed packages
import express from "express";
import multer from "multer";
import cors from "cors";

const PORT = 5000;

//CREATE EXPRESS APP
const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// SET STORAGE
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

//ROUTES
app.get("/api", (req, res) => {
  res.json({ message: "WELCOME" });
});

app.post("/api/upload", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(file);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
```

<br>

##### /src/App.vue

```js
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
```

<hr>

## PART II: Save file to MongoDB with `mongoose`

##### /src/api/index.js

```js
// require the installed packages
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

//CREATE EXPRESS APP
const app = express();
const myurl = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE CONNECTION
mongoose.connect(myurl);
//File Schema
const fileSchema = mongoose.Schema({
  file: { data: "Buffer", contentType: String },
});
const newFile = mongoose.model("file", fileSchema);

// SET STORAGE
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

//ROUTES WILL GO HERE
app.get("/api", (req, res) => {
  res.json({ message: "WELCOME" });
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  var file = fs.readFileSync(req.file.path);

  var encode_file = file.toString("base64");
  var final_file = {
    contentType: req.file.mimetype,
    file: encode_file.toString("base64"),
  };
  console.log(final_file);
  newFile.create(final_file, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("Saved To database");
      res.contentType(final_file.contentType);
      res.send(final_file);
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
```
