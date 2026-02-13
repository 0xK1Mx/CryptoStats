import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../config.env` });
import express from "express";

import usersRouter from "./routes/usersRouter.js";
import marketRouter from "./routes/market/marketRouter.js";

const app = express();

app.use(express.json());

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

app.use("/api/v1/markets", marketRouter);
//handle users routes
app.use("/api/v1/users", usersRouter);

export default app;
