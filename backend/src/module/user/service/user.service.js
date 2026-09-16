import { AppError } from "../../../shared/util/app.error.js";
import { generateAccessToken } from "../../../shared/util/jwt.js";
import { UserModel } from "../models/user.mode.js";
import bcrypt from "bcrypt";

export const registerUserService = async (data) => {
  const { email, password } = data;

  const user = await UserModel.findOne({ email: email });
  if (user) throw new AppError("User already exists", 400, "USER_EXISTS");

  const hashPassword = await bcrypt.hash(password, 12);
  const result = await UserModel.create({
    email: email,
    password: hashPassword,
  });

  return {
    _id: result._id,
    email: result.email,
  };
};

const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new AppError("User not found", 404, "NOT_FOUND");

  return user;
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new AppError("Password must do match", 400, "INVALID_CREDENTIAL");
  }

  const token = await generateAccessToken({ _id: user._id, email: user.email });
  return {
    token: token,
    data: {
      _id: user._id,
      email: user.email,
    },
  };
};

export const myProfileService = async (id) => {
  const user = await UserModel.findById(id).lean();
  const { password, ...userData } = user;

  return userData;
};
