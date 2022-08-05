// require the installed packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

import upload from "./storage.js";
import newFile from "./db.js";

//CREATE EXPRESS APP
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.get("/api", async (req, res) => {
  try {
    fs.readdir("./uploads/", (err, docs) => {
      if (err) console.log(err);
      else {
        fs.readFile(`./uploads/${docs[1]}`, "utf-8", (err, data) => {
          res.status(200).send(data);
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
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

// npm start
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
