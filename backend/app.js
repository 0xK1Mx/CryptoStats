import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./UserModel.js";

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

// Create User
app.route("/api/v1/users").post(async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: " fail",
      error: error,
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
