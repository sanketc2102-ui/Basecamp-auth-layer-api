import express from "express";
import cors from "cors";
import { errorHander } from "./middlewares/error.middleware.js";

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

// Global Error Handler
app.use(errorHander);

export default app;
