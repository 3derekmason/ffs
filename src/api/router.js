import express from "express";

import controller from "./controllers.js";

const router = express.Router();

router.get("/files", controller.getAllFiles);

export default router;
