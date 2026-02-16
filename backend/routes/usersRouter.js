import express from "express";

import { longIn, protect, signUp } from "./../controllers/authController.js";

const router = express.Router();

router.get("/dashboard", protect);
router.post("/signup", signUp);
router.post("/login", longIn);

export default router;
