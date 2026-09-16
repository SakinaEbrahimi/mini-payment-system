import { Link, useNavigate } from "react-router-dom";
import { logOutApi } from "../services/authService.js";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logOutApi();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          💳 MiniPay
        </Link>

        <div className="navbar-nav gap-2">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          <Link className="nav-link" to="/products">
            Products
          </Link>

          <Link className="nav-link" to="/orders">
            Orders
          </Link>

          <Link className="nav-link" to="/payments">
            Payments
          </Link>
        </div>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
