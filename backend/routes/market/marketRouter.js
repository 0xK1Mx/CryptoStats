import express from "express";
import { getMarketInfo } from "../../controllers/marketController.js";

const router = express.Router();

router.get("/", getMarketInfo);

export default router;
