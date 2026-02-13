import app from "./app.js";
import mongoose from "mongoose";

//Connect to server
const port = process.env.PORT || 4000;

mongoose.connect("mongodb://127.0.0.1:27017/cryptoTracker").then(() => {
  console.log("hello from the server");
});

const server = app.listen(port, () => {
  console.log("hello");
});
