import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getOrdersApi } from "../services/orderService.js";
import { getPaymentsApi } from "../services/paymentService.js";
import { myProfile } from "../services/authService.js";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrder] = useState();
  const [totalPayment, setTotalPayment] = useState();
  const [user, setUser] = useState();

  const loadOrders = async () => {
    try {
      const result = await getOrdersApi();
      setOrders(result);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [orders]);

  useEffect(() => {
    const loadData = async () => {
      const [payments, user, orders] = await Promise.all([
        getPaymentsApi(),
        myProfile(),
        getOrdersApi(),
      ]);
      setTotalOrder(orders.length);
      setTotalPayment(payments.length);
      setUser(user);
    };

    loadData();
  }, []);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="mb-5">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Ballance</p>
              <h3 className="fw-bold">
                {user ? `$${user.ballance.toFixed(2)}` : <p>Loading...</p>}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Orders</p>
              <h3 className="fw-bold">{totalOrder}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Payments</p>
              <h3 className="fw-bold">{totalPayment}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions + Recent Orders */}
      <div className="row g-4">
        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Quick Actions</h5>

              <Link to="/products" className="btn btn-primary w-100 mb-3">
                Browse Products
              </Link>

              <Link to="/orders" className="btn btn-outline-primary w-100 mb-3">
                My Orders
              </Link>

              <Link to="/payments" className="btn btn-outline-primary w-100">
                Payment History
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Recent Orders</h5>

                <Link to="/orders" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>

              <div className="table-responsive">
                {orders.length > 0 ? (
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    {orders.slice(0, 3).map((order, index) => {
                      return (
                        <tbody key={order._id}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{order.product.name}</td>
                            <td>${order.amount}</td>
                            <td>
                              <span
                                className={
                                  order.status === "Paid"
                                    ? "badge text-bg-success"
                                    : order.status === "Pending"
                                      ? "badge text-bg-warning"
                                      : "badge text-bg-secondary"
                                }>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                ) : (
                  <div>Orders not found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
