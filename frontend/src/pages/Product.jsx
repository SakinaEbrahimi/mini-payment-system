import { useEffect, useState } from "react";
import { getProductsApi } from "../services/products.Service.js";
import ProductCard from "../component/ProductCard.jsx";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadProduct = async () => {
    try {
      setIsLoading(true)
      const result = await getProductsApi(search);
      setProducts(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await loadProduct();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  if (isLoading)
    return (
      <div>
        <p style={{ fontSize: "20px" }}>Loading...</p>
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Products</h2>
        <p className="text-muted">Browse our available products</p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search ... "
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={loadProduct}>
            Search
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="row g-4">
        {products.length > 0 &&
          products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} onBuySuccess={loadProduct} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
