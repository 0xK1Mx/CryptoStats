import User from "../models/UserModel.js";
import express from "express";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
import crypto from "crypto";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/sendMails.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

function generateJWT(user, statusCode, res) {
  //Generate JWT
  const token = signToken(user._id);

  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: "lax",
  };

  if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

  res.cookie("jwt", token, cookiesOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
  });
}

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  generateJWT(newUser, 201, res);
});

export const longIn = catchAsync(async (req, res, next) => {
  //Check if there email or password
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please enter a valid email and password", 400));
  }
  // Check if users email exist
  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );

  const verifyPassword = await user?.comparePassword(
    req.body.password,
    user.password,
  );

  if (!user || !verifyPassword) {
    return next(new AppError("Password or email is not correct.", 401));
  }

  generateJWT(user, 200, res);
});

// Implement protected routes
export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to that token doesn't exist.", 401),
    );
  }

  req.user = currentUser;
  next();
});

// Implementing reset password
export const forgotPassword = catchAsync(async (req, res, next) => {
  // Check if user exist based on the email they provide
  //Find that user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError("no account was found related to that email address", 400),
    );
  }

  // If user, then generate a hash token that will be send to user email
  const token = await user.createResetToken();
  await user.save({ validateBefore: false });

  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${token}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this emial`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "reset password",
      text: message,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;
    await user.save({ validateBeforeSave: false });
  }

  res.json({
    status: "success",
    message: "token sent to email",
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //find the user with that token
  // fine me user with that token value and which the expire time is not expired
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetTokenExpiration: { $gt: Date.now() },
  });

  //If user exist and if time is not expired
  if (!user) {
    return next(new AppError("no user found or token have expired", 400));
  }

  // set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiration = undefined;

  await user.save({ validateBeforeSave: false });

  //change the password last modified date in model
  generateJWT(user, 200, res);
});

//Implement update password
export const updatePassword = catchAsync(async (req, res, next) => {
  // get user from collection
  const currentUser = await User.findById(req.user.id).select("+password");

  const corretPwd = await currentUser.comparePassword(
    req.body.currentPassword,
    currentUser.password,
  );

  if (!corretPwd) {
    return next(new AppError("password are not the same", 400));
  }

  currentUser.password = req.body.password;
  currentUser.passwordConfirm = req.body.passwordConfirm;
  await currentUser.save();

  res.json({
    status: "success",
    message: "success modified password",
  });
});

export const updateUserInfo = catchAsync(async (req, res, next) => {
  // Check if user tried to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("You cannot update your password here", 401));
  }

  //filtering out bad request fields

  function filterObj(obj, ...params) {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (params.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
  }
  const reqObj = filterObj(req.body, "name", "email");

  // find user and update
  const updatedUser = await User.findByIdAndUpdate(req.user.id, reqObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "succees",
    user: updatedUser,
  });
});

export const getuser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "sucess",
    user: req.user,
  });
});
