import "dotenv/config.js";
import e from "express";
import authRoutes from "./module/user/routes/auth.routes.js";
import { errorHandler } from "./shared/middleware/error.handler.js";
import productRoutes from "./module/product/route/product.routes.js";
import { authMiddleware } from "./shared/middleware/auth.middleware.js";
import paymentRoutes from "./module/payment/route/payment.routes.js";
import orderRoutes from "./module/order/route/order.routes.js";
import userRoutes from "./module/user/routes/user.routes.js";
import cors from "cors";

const app = e();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(e.json());

app.use("/api/auth", authRoutes);
app.use(authMiddleware);

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);
export default app;
