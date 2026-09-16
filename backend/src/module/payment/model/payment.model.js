import mongoose, { model } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Cancelled"],
      default: "Pending",
      required: true,
    },
    idempotencyKey: {
      type: String,
      sparse: true,
      default: null,
    },
  },
  { timestamps: true },
);

export const PaymentModel = model("Payment", paymentSchema);
