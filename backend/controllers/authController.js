import User from "../models/UserModel.js";
import express from "express";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    //Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const longIn = async (req, res, next) => {
  try {
    //Check if there email or password
    if (!req.body.email || !req.body.password) {
      throw new Error("error");
    }
    // Check if users email exist
    const user = await User.findOne({ email: req.body.email }).select(
      "+password",
    );

    const verifyPassword = user?.comparePassword(
      req.body.password,
      user.password,
    );

    if (!user || !verifyPassword) {
      throw new Error("error");
    }

    //Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(200).json({
      status: "success",
      token,
    });

    // Check if password is valid
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

// Implement protected routes
export const protect = async (req, res, next) => {
  try {
    // Check if user have token
    let token;
    if (
      req.headers.autorization &&
      req.headers.autorization.startsWith("bearer")
    ) {
      token = req.headers.autorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("User is not login");
    }

    // JWT verification
    const verificationofJWT = jwt.verify(token, process.env.JWT_SECRET);

    //Find that user
    const currentUser = await User.findById(verificationofJWT.id);

    if (!currentUser) {
      throw new Error("The user that belong to the token no longer exist", 401);
    }

    //Check if the password was changed after the jwt was issued
    if (currentUser.checkPasswordLastModifytime(verificationofJWT.iat)) {
      throw error("Password Changed recently", 401);
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c20ed8bc006362",
    pass: "d6138c38835b7f",
  },
});

async function sendEmail(options) {
  const mailOptions = {
    from: "CryptoStats <no-reply@cryptostats.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
}

// Implementing reset password
export const forgotPassword = async (req, res, next) => {
  // Check if user exist based on the email they provide
  try {
    //Find that user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("no account was found related to that email address");
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
      user.passwordResetExpries = undefined;
      await user.save({ validateBeforeSave: false });
    }

    res.json({
      status: "success",
      message: "token sent to email",
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
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
      throw new Error("no user found or token have expired");
    }

    // set the new password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;

    await user.save();

    //change the password last modified date in model

    //Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.json({
      status: "success",
      message: "success modified password",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

//Implement update password
export const updatePassword = async (req, res, next) => {
  try {
    // get user from collection
    const currentUser = await User.findById(req.user.id).select("+password");

    const corretPwd = currentUser.comparePassword(
      req.body.currentPassword,
      currentUser.password,
    );

    if (!corretPwd) {
      throw new Error("password are not the same");
    }

    currentUser.password = req.body.password;
    currentUser.passwordConfirm = req.body.passwordConfirm;
    await currentUser.save();

    res.json({
      status: "success",
      message: "success modified password",
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};
