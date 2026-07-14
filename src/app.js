import express from "express";
import cors from "cors";
import { errorHander } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET, POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

// Global Error Handler
app.use(errorHander);

export default app;
