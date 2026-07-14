import User from "../models/userSchma.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHander } from "../utils/asyncHandler.js";
import { registerUserEmailMailGen, sendMail } from "../utils/email.js";

async function generateAcessAndRefreshToken(userId) {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh tokens",
    );
  }
}

const registerUser = asyncHander(async (req, res) => {
  const { userName, email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(409, `User with email ${email} already exist`);
  }

  const user = await User.create({
    username: userName,
    email,
    password,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiery = tokenExpiry;

  user.save({ validateBeforeSave: false });

  await sendMail({
    email: user.email,
    subject: "Please Verify your email",
    mailgenContent: registerUserEmailMailGen(
      user.userName,
      `${req.protocol}://${req.get("host")}/auth/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-refreshToken -password -forgetPassWordToken -forgetPassExpiery -emailVerificationToken -emailVerificationExpiery",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "user registred successfully"));
});

export { registerUser };
