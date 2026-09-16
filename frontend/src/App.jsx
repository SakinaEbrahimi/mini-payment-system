import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { MainLayout } from "./layout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Product.jsx";
import Orders from "./pages/Order.jsx";
import Payments from "./pages/Payment.jsx";
import ProductDetails from "./component/ProductDetails.jsx";
import ProtectRoutes from "./component/ProtectRoutes.jsx";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Route */}
          <Route element={<ProtectRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payments" element={<Payments />} />
              <Route
                path="/products/details/:id"
                element={<ProductDetails />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
