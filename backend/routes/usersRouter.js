import express from "express";

import {
  login,
  protect,
  forgotPassword,
  resetPassword,
  signUp,
  getuser,
  logOut,
} from "./../controllers/authController.js";
import User from "../models/UserModel.js";

const router = express.Router();
router.post("/watchlist", protect, async function (req, res, next) {
  //Find the user
  const user = await User.findById(req.user.id);

  const alreadyExists = user.watchList.some((coin) => coin.id === req.body.id);

  console.log(alreadyExists);
  if (!alreadyExists) {
    user.watchList.unshift(req.body);
    await user.save();
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

router.delete("/watchlist", protect, async function (req, res, next) {
  const user = await User.findById(req.user.id);

  user.watchList = user.watchList.filter((el) => el.id !== req.body.id);
  await user.save();

  res.status(200).json({
    status: "success",
    user,
  });
});

router.get("/me", protect, getuser);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logOut);

router.post("/forgotpwd", forgotPassword);
router.patch("/resetPwd/:token", resetPassword);
export default router;
