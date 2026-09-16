import mongoose from "mongoose";
import { AppError } from "../../../shared/util/app.error.js";
import { OrderModel } from "../../order/model/order.model.js";
import { orderExistForUser } from "../../order/service/order.service.js";
import { PaymentModel } from "../model/payment.model.js";
import { UserModel } from "../../user/models/user.mode.js";

export const getPaymentsService = async (userId) => {
  const payment = await PaymentModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: "orders",
        localField: "orderId",
        foreignField: "_id",
        as: "order",
        pipeline: [
          {
            $project: {
              quantity: 1,
              status: 1,
              amount: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$order",
    },
  ]);

  return payment;
};

export const paymentService = async (id, userId, idempotencyKey) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check user ballance
    let user = await UserModel.findById(userId).session(session);
    if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");

    /** Check Payment Exist */
    const payment = await PaymentModel.findOne({
      _id: id,
      userId,
      status: { $in: ["Pending", "Failed"] },
    }).session(session);
    if (!payment) {
      throw new AppError("Payment not found", 404, "PAYMENT_NOT_FOUND");
    }

    // Check idempotencyKey
    if (payment.idempotencyKey === idempotencyKey) {
      return {
        success: payment.status === "Success",
        message: `Payment already process ${payment.status}`,
      };
    }

    /** Check  Order Exist With Pending Status And Depend to User*/
    const order = await orderExistForUser(payment.orderId, userId);

    const isSuccess = Math.random() < 0.5;

    if (isSuccess) {
      /** Payment => Success */
      const updatePayment = await PaymentModel.findOneAndUpdate(
        {
          _id: id,
          userId,
          status: { $in: ["Pending", "Failed"] },
        },
        {
          $set: { status: "Success", idempotencyKey: idempotencyKey },
        },
        { returnDocument: "after", runValidators: true, session },
      );

      if (!updatePayment)
        throw new AppError("Payment not found", 404, "PAYMENT_NOT_FOUND");

      /** Update user ballance */
      user = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          ballance: { $gte: order.amount },
        },
        {
          $inc: { ballance: -order.amount },
        },
        {
          returnDocument: "after",
          runValidators: true,
          session,
        },
      );
      if (!user)
        throw new AppError(
          "You do not have enough ballance",
          400,
          "NOT_ENOUGH_BALLANCE",
        );

      /** Order => Paid */
      await OrderModel.findByIdAndUpdate(
        {
          _id: payment.orderId,
        },
        {
          $set: {
            status: "Paid",
          },
        },
        { returnDocument: "after", runValidators: true, session },
      );
    } else {
      /** Payment => Failed */
      await PaymentModel.findOneAndUpdate(
        {
          _id: id,
          userId,
        },
        {
          $set: { status: "Failed", idempotencyKey: idempotencyKey },
        },
        { returnDocument: "after", runValidators: true, session },
      );
    }

    await session.commitTransaction();
    console.log("Transaction committed");

    return {
      success: isSuccess,
      message: `Payment ${isSuccess ? "completed successfully" : "failed"}`,
    };
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getPaymentByOrderIdService = async (orderId, userId) => {
  const order = await OrderModel.findOne({ _id: orderId, userId });

  if (!order) throw new AppError("Order not found", 404, "ORDER_NOT_FOUND");

  const payment = await PaymentModel.findOne({
    orderId: orderId,
    userId,
  });

  return payment;
};
