import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError.js";

function validate(req, res, next) {
  const result = validationResult(req);

  if (result.isEmpty) {
    return next();
  }

  const errors = result.array().map((err) => ({
    [err.path]: err.msg,
  }));

  throw new ApiError(422, "received data is not valid", errors);
}

export default validate;
