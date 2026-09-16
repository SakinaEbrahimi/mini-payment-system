import { AppError } from "../util/app.error.js";

export const validate =
  (schema, part = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const issue = result.error.issues[0];
      const field = issue.path[0] || "unknown";
      const errorCode = "VALIDATION_ERROR";
      const message = issue.message;
      return next(new AppError(message, 400, errorCode, field));
    }

    if (part === "body") req.body = result.data;
    if (part === "params") {
      req.params = result.data;
    }
    if (part === "query") Object.assign(req.query, result.data);

    next();
  };
