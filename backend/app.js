import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../config.env` });
import express from "express";

import usersRouter from "./routes/usersRouter.js";
import marketRouter from "./routes/market/marketRouter.js";
import { errorController } from "./controllers/errorController.js";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: "Too many requests...Please try again later",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

// Data cleaning against noSQL query injection
//XXS

// Preventing parameter pollution
app.use(
  hpp({
    whitelist: [],
  }),
);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);

app.use("/api/v1/markets", marketRouter);
//handle users routes
app.use("/api/v1/users", usersRouter);

app.use(errorController);

export default app;
