export class AppError extends Error {
  constructor(message, status = 400, code, field) {
    super(message);

    this.name = "APP_ERROR";
    this.status = status;
    this.code = code;
    this.field = field;
    this.isOperational = true;
  }
}
