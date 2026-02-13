import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../config.env` });
import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./UserModel.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

const port = 8000;

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

app.route("/api/v1/markets").get(async (req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1",
    );

    const data = await response.json();

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.json({
      status: "fail",
      error,
    });
  }
});

// Sign up User
app.route("/api/v1/users/signup").post(async (req, res, next) => {
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
});

// Login user
app.route("/api/v1/users/login").post(async (req, res, next) => {
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
});

//Connect to server
mongoose.connect("mongodb://127.0.0.1:27017/cryptoTracker").then(() => {
  console.log("hello from the server");
});

const server = app.listen(port, () => {
  console.log("hello");
});
