// require the installed packages
import express from "express";
// import multer from "multer";

const PORT = 5000;

//CREATE EXPRESS APP
const app = express();

//ROUTES WILL GO HERE
app.get("/api/", (req, res) => {
  res.json({ message: "WELCOME" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
