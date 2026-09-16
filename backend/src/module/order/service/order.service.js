import mongoose from "mongoose";
import { AppError } from "../../../shared/util/app.error.js";
import { OrderModel } from "../model/order.model.js";
import { PaymentModel } from "../../payment/model/payment.model.js";

export const orderExistForUser = async (id, userId) => {
  const order = await OrderModel.findOne({
    _id: id,
    status: "Pending",
    userId,
  });

  if (!order) throw new AppError("Order not found", 404, "ORDER_NOT_FOUND");

  return order;
};

export const getAllOderService = async (userId) => {
  const orders = await OrderModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
        pipeline: [
          {
            $project: {
              name: 1,
              price: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$product",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return orders;
};

export const getOrderService = async (id) => {
  const result = await OrderModel.findById(id).populate("productId");

  return result;
};

export const cancelOrderService = async (id, userId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await orderExistForUser(id, userId);

    await OrderModel.findOneAndUpdate(
      {
        _id: id,
        userId,
        status: "Pending",
      },
      {
        $set: {
          status: "Cancelled",
        },
      },
      {
        session,
        returnDocument: "after",
        runValidators: true,
      },
    );

    await PaymentModel.findOneAndUpdate(
      {
        orderId: id,
        userId: userId,
      },
      {
        $set: {
          status: "Cancelled",
        },
      },
      {
        session,
        returnDocument: "after",
        runValidators: true,
      },
    );

    await session.commitTransaction();
    console.log("Transaction committed");

    return {
      message: "Order cancelled successfully",
    };
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
