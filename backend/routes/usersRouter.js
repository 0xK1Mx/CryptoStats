import express from "express";

import {
  longIn,
  protect,
  forgotPassword,
  resetPassword,
  signUp,
  getuser,
} from "./../controllers/authController.js";

const router = express.Router();

router.get("/me", protect, getuser);
router.post("/signup", signUp);
router.post("/login", longIn);

router.post("/forgotpwd", forgotPassword);
router.patch("/resetPwd/:token", resetPassword);
export default router;
