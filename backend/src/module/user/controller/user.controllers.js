import { AppError } from "../../../shared/util/app.error.js";
import {
  loginUserService,
  myProfileService,
  registerUserService,
} from "../service/user.service.js";

export const registerUser = async (req, res) => {
  const data = req.body;
  const result = await registerUserService(data);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const loginUser = async (req, res) => {
  const data = req.body;

  const result = await loginUserService(data);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const myProfile = async (req, res) => {
  if (!req.user)
    throw new AppError("User is not authorized", 401, "UNAUTHORIZED");

  const result = await myProfileService(req.user._id);

  res.status(200).json({
    success: true,
    result,
  });
};
