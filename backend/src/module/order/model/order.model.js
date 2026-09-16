import mongoose, { model, Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      required: true,
      default: "Pending",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const OrderModel = model("Order", orderSchema);
