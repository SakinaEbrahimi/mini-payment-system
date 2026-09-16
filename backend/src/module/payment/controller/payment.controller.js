import { AppError } from "../../../shared/util/app.error.js";
import {
  getPaymentByOrderIdService,
  getPaymentsService,
  paymentService,
} from "../service/payment.service.js";

export const getPayments = async (req, res) => {
  if (!req.user)
    throw new AppError("User is not authorized", 401, "UNAUTHORIZED");

  const result = await getPaymentsService(req.user._id);
  res.status(200).json({
    success: true,
    result,
  });
};

export const payment = async (req, res) => {
  if (!req.user)
    throw new AppError("User is not authorized", 401, "UNAUTHORIZED");

  const id = req.params.id;

  const idempotencyKey = req.headers["idempotency-key"];

  if (!idempotencyKey) {
    throw new AppError(
      "Idempotency-Key is required",
      400,
      "IDEMPOTENCY_REQUIRED",
    );
  }

  const result = await paymentService(id, req.user._id, idempotencyKey);

  res.status(200).json({
    success: result.success,
    message: result.message,
  });
};

export const getPaymentByOrderId = async (req, res) => {
  if (!req.user)
    throw new AppError("User is not authorized", 401, "UNAUTHORIZED");

  const orderId = req.params.orderId;

  const result = await getPaymentByOrderIdService(orderId, req.user._id);

  res.status(200).json({ success: true, result });
};
