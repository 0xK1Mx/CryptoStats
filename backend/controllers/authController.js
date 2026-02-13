import User from "../models/UserModel.js";
import express from "express";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    console.log(process.env.JWT_SECRET);

    //Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

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
