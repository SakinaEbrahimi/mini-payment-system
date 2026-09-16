import { AppError } from "../../../shared/util/app.error.js";
import {
  cancelOrderService,
  getAllOderService,
  getOrderService,
} from "../service/order.service.js";

export const getOrders = async (req, res) => {
  if (!req.user)
    throw new AppError("User is not authorized", 401, "UNAUTHORIZED");

  const result = await getAllOderService(req.user._id);

  res.status(200).json({
    success: true,
    result,
  });
};

export const getOrder = async (req, res) => {
  const id = req.params.id;

  const result = await getOrderService(id);

  res.status(200).json({
    success: true,
    result,
  });
};

export const cancelOrder = async (req, res) => {
  if (!req.user)
    throw new AppError("User is not authorized", 401, "UNAUTHORIZED");

  const id = req.params.id;

  const result = await cancelOrderService(id, req.user._id);

  res.status(200).json({
    success: true,
    result,
  });
};
