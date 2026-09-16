import toast from "react-hot-toast";
import { loginApi } from "../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      const result = await loginApi({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      localStorage.setItem("accessToken", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.data));

      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        <div
          className="col-5 bg-primary text-white
                    d-flex flex-column
                    align-items-center
                    justify-content-center">
          <h1 className="fw-bold">💳 MiniPay</h1>

          <p>Simple & Secure Payment System</p>
        </div>

        <div
          className="col-7 bg-light
                    d-flex
                    align-items-center
                    justify-content-center">
          <div className="card shadow-sm border-0" style={{ width: "430px" }}>
            <div className="card-body p-4">
              <h2 className="fw-bold">Welcome Back 👋</h2>

              <p className="text-info">Login to your account</p>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="example@email.com"
                    name="email"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    name="password"
                  />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Login →
                </button>
              </form>

              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <Link to="/register" className="text-decoration-none">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
