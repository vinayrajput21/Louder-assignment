import express from "express";
import { createSearch, getSearchHistory } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", createSearch);
router.get("/", getSearchHistory);

export default router;