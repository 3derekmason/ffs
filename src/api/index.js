import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./router.js";

// mongodb+srv://derekmason:<password>@saor-blog.rxnmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/", router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
});
