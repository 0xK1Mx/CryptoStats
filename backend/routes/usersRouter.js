import express from "express";

import {
  longIn,
  protect,
  forgotPassword,
  resetPassword,
  signUp,
  getuser,
} from "./../controllers/authController.js";
import User from "../models/UserModel.js";

const router = express.Router();
router.post("/watchlist", protect, async function (req, res, next) {
  //Find the user
  const user = await User.findById(req.user.id);

  const alreadyExists = user.watchList.some((coin) => coin.id === req.body.id);

  console.log(alreadyExists);
  if (!alreadyExists) {
    user.watchList.push(req.body);
    await user.save();
  }

  res.status(200).json({
    status: "success",
    user,
  });
});
router.get("/me", protect, getuser);
router.post("/signup", signUp);
router.post("/login", longIn);

router.post("/forgotpwd", forgotPassword);
router.patch("/resetPwd/:token", resetPassword);
export default router;
