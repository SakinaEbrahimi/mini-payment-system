import { Router } from "express";
import { asyncHandler } from "../../../shared/middleware/async.handler.js";
import {
  buyProduct,
  getProduct,
  getProducts,
} from "../controller/product.controller.js";
import { validate } from "../../../shared/middleware/validate.js";
import {
  buyProductSchema,
  productIdSchema,
  searchQuerySchema,
} from "../dto/product.dto.js";

const router = Router();

router.get(
  "/:id",
  validate(productIdSchema, "params"),
  asyncHandler(getProduct),
);

router.get(
  "/",
  validate(searchQuerySchema, "query"),
  asyncHandler(getProducts),
);

router.post(
  "/:id/buy",
  validate(productIdSchema, "params"),
  validate(buyProductSchema, "body"),
  asyncHandler(buyProduct),
);

export default router;
