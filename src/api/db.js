import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

// DATABASE CONNECTION
mongoose.connect(url);
//File Schema
const fileSchema = mongoose.Schema({
  file: { data: "Buffer", contentType: String },
});

const newFile = mongoose.model("file", fileSchema);

export default newFile;
