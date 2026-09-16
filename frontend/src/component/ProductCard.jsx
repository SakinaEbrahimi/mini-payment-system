import { useState } from "react";
import toast from "react-hot-toast";
import { buyProduct } from "../services/products.Service.js";

function ProductCard({ product, onBuySuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState(null);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleBuy = async (id, quantity) => {
    try {
      setProductId(id);
      const result = await buyProduct(id, { quantity: quantity });

      toast.success(result);
      await onBuySuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProductId(null);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* Product Card */}
      <div className="card h-100 border-0 shadow-sm">
        <div
          className="bg-light d-flex align-items-center justify-content-center"
          style={{ height: "200px" }}>
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{
              maxHeight: "180px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title fw-bold">{product.name}</h5>

          <p className="text-muted">{product.description}</p>

          <p>{product.category}</p>
          <p>Stock {product.stock}</p>

          <h5 className="fw-bold mb-3">${product.price}</h5>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={() => setShowModal(true)}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Buy {product.name}</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <div className="d-flex justify-content-between ">
                  <span className="fw-semibold">Price</span>
                  <span>${product.price}</span>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Quantity</label>

                  <div className="input-group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={decreaseQuantity}>
                      −
                    </button>

                    <input
                      type="number"
                      className="form-control text-center"
                      value={quantity}
                      min="1"
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value)))
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between border-top pt-3">
                  <span className="fw-semibold">Total</span>

                  <strong className="text-primary">
                    ${(product.price * quantity).toFixed(2)}
                  </strong>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={productId && productId === product._id}
                  style={{
                    cursor:
                      productId && productId === product._id
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() => handleBuy(product._id, quantity)}>
                  {productId === product._id ? "Buying..." : "Confirm Purchase"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
