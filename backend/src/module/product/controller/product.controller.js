import { AppError } from "../../../shared/util/app.error.js";
import {
  buyProductService,
  getAllProducts,
  getProductById,
} from "../service/product.service.js";

export const getProducts = async (req, res) => {
  const search = req.query.search;
  const result = await getAllProducts(search);

  res.status(200).json({
    success: true,
    result,
  });
};

export const getProduct = async (req, res) => {
  const id = req.params.id;
  const result = await getProductById(id);

  res.status(200).json({
    success: true,
    result,
  });
};

export const buyProduct = async (req, res) => {
  const productId = req.params.id;

  if (!req.user)
    throw new AppError("User is not authorized", 401, "UNAUTHORIZED");

  const quantity = req.body.quantity;
  const result = await buyProductService(req.user._id, productId, quantity);

  res.status(200).json({
    success: true,
    result,
  });
};
