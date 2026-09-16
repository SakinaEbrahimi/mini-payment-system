import { Router } from "express";
import { validate } from "../../../shared/middleware/validate.js";
import { orderIdSchema, paymentIdSchema } from "../dto/payment.dto.js";
import { asyncHandler } from "../../../shared/middleware/async.handler.js";
import {
  getPaymentByOrderId,
  getPayments,
  payment,
} from "../controller/payment.controller.js";

const router = Router();

router.get("/", asyncHandler(getPayments));

router.get(
  "/order/:orderId",
  validate(orderIdSchema, "params"),
  asyncHandler(getPaymentByOrderId),
);

router.put(
  "/:id/pay",
  validate(paymentIdSchema, "params"),
  asyncHandler(payment),
);

export default router;
