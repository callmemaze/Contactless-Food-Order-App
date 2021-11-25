import express from "express";
import { getMenu } from "./posts.js";
const router = express.Router();

router.get("/", getMenu);
export default router;
