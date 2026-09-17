import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { cancelOrdersApi, getOrdersApi } from "../services/orderService.js";
import {
  getPaymentsApi,
  payOrderPaymentsApi,
} from "../services/paymentService.js";
import { useRef } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(null);
  const idempotencyKeyRef = useRef(null);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const [orders, payments] = await Promise.all([
        getOrdersApi(),
        getPaymentsApi(),
      ]);

      const ordersWithPayment = orders.map((order) => {
        const payment = payments.find(
          (payment) => payment.orderId === order._id,
        );

        return {
          ...order,
          paymentId: payment?._id,
        };
      });

      setOrders(ordersWithPayment);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      setProcessing({
        orderId: id,
        action: "Cancel",
      });
      const result = await cancelOrdersApi(id);

      toast.success(result.message);
      await loadOrders();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProcessing(null);
    }
  };

  const handlePayOrder = async (paymentId, orderId) => {
    try {
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = crypto.randomUUID();
      }

      setProcessing({
        orderId: orderId,
        action: "Pay",
      });
      const result = await payOrderPaymentsApi(
        paymentId,
        idempotencyKeyRef.current,
      );

      idempotencyKeyRef.current = null;

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      await loadOrders();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProcessing(null);
    }
  };

  if (isLoading)
    return (
      <div>
        <p style={{ fontSize: "20px" }}>Loading...</p>
      </div>
    );

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="mb-5">
        <h2 className="fw-bold">My Orders</h2>
        <p className="text-muted">View and manage your orders</p>
      </div>

      {/* Orders List */}

      <div className="card border-0 shadow-sm">
        <div className="card-body ">
          <div className="table-responsive">
            {orders.length > 0 ? (
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>OrderId</th>
                    <th>Product</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Total Cost</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    return (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to={`/products/details/${order.productId}`}
                            style={{ color: "black" }}>
                            {order.product.name}
                          </Link>
                        </td>
                        <td>${order.product.price}</td>
                        <td>{order.quantity}</td>
                        <td>${order.amount.toFixed(2)}</td>
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
                        <td>
                          {order.status === "Pending" ? (
                            <>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() =>
                                  handlePayOrder(order.paymentId, order._id)
                                }
                                disabled={
                                  processing && processing.orderId === order._id
                                }>
                                {processing &&
                                processing.orderId === order._id &&
                                processing.action === "Pay"
                                  ? "Paying..."
                                  : "Pay Now"}
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                disabled={
                                  processing &&
                                  processing?.orderId === order._id
                                }
                                style={{
                                  cursor:
                                    processing &&
                                    processing.orderId === order._id
                                      ? "not-allowed"
                                      : "pointer",
                                }}
                                onClick={() => handleCancelOrder(order._id)}>
                                {processing &&
                                processing.orderId === order._id &&
                                processing.action === "Cancel"
                                  ? "Cancelling"
                                  : "Cancel"}
                              </button>
                            </>
                          ) : order.status === "Paid" ? (
                            <p style={{ color: "green" }}>
                              <strong>{order.status}</strong>
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>{order.status}</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>Orders Not Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
