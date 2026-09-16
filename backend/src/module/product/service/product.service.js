import mongoose from "mongoose";
import { AppError } from "../../../shared/util/app.error.js";
import { ProductModel } from "../model/product.model.js";
import { OrderModel } from "../../order/model/order.model.js";
import { PaymentModel } from "../../payment/model/payment.model.js";

export const getAllProducts = async (searchQuery = {}) => {
  let filterQuery = {};
  if (Object.keys(searchQuery).length > 0) {
    filterQuery.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ];
  }

  return await ProductModel.find(filterQuery);
};

export const getProductById = async (id) => {
  const product = await ProductModel.findById({ _id: id });
  if (!product) throw new AppError("Product was not found", 404, "NOT_FOUND");

  return product;
};

export const buyProductService = async (userId, productId, quantity) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const product = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gte: quantity },
      },
      {
        $inc: { stock: -quantity },
      },
      { returnDocument: "after", runValidators: true, session },
    );

    if (!product)
      throw new AppError(
        "Product stock is not enough.",
        400,
        "NOT_ENOUGH_STOCK",
      );

    const totalPrice = product.price * quantity;
    const order = await OrderModel.create(
      [
        {
          userId: userId,
          productId: productId,
          quantity: quantity,
          status: "Pending",
          amount: totalPrice,
        },
      ],
      { session },
    );

    await PaymentModel.create(
      [
        {
          orderId: order[0]._id,
          userId,
          productId,
          status: "Pending",
        },
      ],
      { session },
    );

    await session.commitTransaction();
    console.log("Transaction committed");
    return {
      message: "Order created Successfully.",
    };
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
