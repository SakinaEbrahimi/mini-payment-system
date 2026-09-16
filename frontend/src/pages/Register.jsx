import toast from "react-hot-toast";
import { registerApi } from "../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const pass = formData.get("password");
      const confPass = formData.get("confPass");

      if (pass !== confPass) {
        toast.error("Password has to match");
        return;
      }

      await registerApi({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      toast.success("Registration Successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        <div
          className="col-7 bg-light
                    d-flex
                    align-items-center
                    justify-content-center">
          <div className="card shadow-sm border-0" style={{ width: "430px" }}>
            <div className="card-body p-4">
              <h2 className="fw-bold">Welcome Back 👋</h2>

              <p className="text-info">Create your account</p>

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm"
                    placeholder="example@email.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confPass"
                    className="form-control form-control-sm"
                    placeholder="Confirm your password"
                  />
                </div>

                <button className="btn btn-primary w-100">Sign Up →</button>
              </form>

              <div className="text-center mt-3">
                <span>I have account </span>
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-5 bg-primary text-white
                    d-flex flex-column
                    align-items-center
                    justify-content-center">
          <h1 className="fw-bold">💳 MiniPay</h1>

          <p>Simple & Secure Payment System</p>
        </div>
      </div>
    </div>
  );
}
