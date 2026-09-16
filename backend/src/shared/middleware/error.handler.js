import { AppError } from "../util/app.error.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.status).json({
      message: err.message,
      code: err.code,
      field: err.field,
    });
  }

  if (err.status === 500) {
    res.status(500).json({
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
