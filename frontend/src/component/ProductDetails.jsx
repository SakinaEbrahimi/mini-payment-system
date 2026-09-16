import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { getProductByIdApi } from "../services/products.Service.js";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductByIdApi(id);

        setProduct(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title">{product.name}</h2>
              <br />
              <div
                className="bg-light d-flex align-items-center justify-content-center"
                style={{ height: "200px" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid"
                  style={{
                    maxHeight: "230px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className="card-text text-muted">{product.description}</p>

              <h4 className="fw-bold">${product.price}</h4>

              <p>Stock: {product.stock}</p>

              <Link className="btn btn-primary" to="/orders">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
