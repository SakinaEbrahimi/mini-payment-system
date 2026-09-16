import { AppError } from "../util/app.error.js";
import { verifyJwt } from "../util/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new AppError("Unauthorized: Token missing", 401, "INVALID_JWT");
  }
  const token = authHeader.split(" ")[1];

  if (!token)
    throw new AppError("Authorization token is required", 401, "UNAUTHORIZED");

  const decoded = verifyJwt(token);

  req.user = {
    _id: decoded._id,
    email: decoded.email,
  };
  next();
};
