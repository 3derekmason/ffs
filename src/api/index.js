import express from "express";

const app = express();

app.use(express.json());

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
});
