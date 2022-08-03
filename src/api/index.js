// require the installed packages
import express from "express";
import multer from "multer";
import cors from "cors";
// import mongodb from "mongodb";
// import fs from "fs";

const PORT = 5000;

//CREATE EXPRESS APP
const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// DATABASE CONNECTION
// const MongoClient = mongodb.MongoClient;
// const myurl = import.meta.env.MONGODB_URI;

// let db;

// MongoClient.connect(myurl, (err, client) => {
//   if (err) return console.log(err);
//   db = client.db("forfssake");
//   app.listen(3000, () => {
//     console.log("Database connected successfully");
//   });
// });

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

//ROUTES WILL GO HERE
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
