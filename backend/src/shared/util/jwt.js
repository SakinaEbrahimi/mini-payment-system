import jwt from "jsonwebtoken";
import { AppError } from "./app.error.js";

export const generateAccessToken = ({ _id, email }) => {
  return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError("Invalid access token", 401, "INVALID_ACCESS_TOKEN");
  }
};
