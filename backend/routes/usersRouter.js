import express from "express";

import { longIn, signUp } from "./../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", longIn);

export default router;
