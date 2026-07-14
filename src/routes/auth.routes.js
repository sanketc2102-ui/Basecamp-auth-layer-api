import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import { registerUserValidator } from "../validators/index.js";

const router = Router();

router
  .route("/register-user")
  .post(registerUserValidator(), validate, registerUser);

export default router;
