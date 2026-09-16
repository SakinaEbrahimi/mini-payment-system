import { Router } from "express";
import { asyncHandler } from "../../../shared/middleware/async.handler.js";
import {
  cancelOrder,
  getOrder,
  getOrders,
} from "../controller/order.controller.js";
import { validate } from "../../../shared/middleware/validate.js";
import { orderIdSchema } from "../dto/order.dto.js";

const router = Router();

router.get("/", asyncHandler(getOrders));

router.get("/:id", validate(orderIdSchema, "params"), asyncHandler(getOrder));

router.patch(
  "/:id/cancel",
  validate(orderIdSchema, "params"),
  asyncHandler(cancelOrder),
);

export default router;
