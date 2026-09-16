import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    ballance: {
      type: Number,
      default: 1000,
      min: 0,
    },
  },
  { timestamps: true },
);

export const UserModel = model("User", userSchema);
