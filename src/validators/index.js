import { body } from "express-validator";

const registerUserValidator = () => {
  return [
    body("userName").trim().notEmpty().withMessage("username is required"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required filed")
      .isEmail()
      .withMessage("please enter valid email"),

    body("password").trim().notEmpty().withMessage("password is required"),
  ];
};

export { registerUserValidator };
