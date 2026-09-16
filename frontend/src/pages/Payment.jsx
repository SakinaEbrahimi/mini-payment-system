import toast from "react-hot-toast";
import {
  getPaymentsApi,
  payOrderPaymentsApi,
} from "../services/paymentService.js";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const idempotencyKeyRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayingId, setIsPayingId] = useState(null);

  const loadPayments = async () => {
    try {
      setIsLoading(true);

      const result = await getPaymentsApi();

      setPayments(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handlePayOrder = async (paymentId) => {
    try {
      if (!idempotencyKeyRef.current) {
        idempotencyKeyRef.current = crypto.randomUUID();
      }

      setIsPayingId(paymentId);
      const result = await payOrderPaymentsApi(
        paymentId,
        idempotencyKeyRef.current,
      );

      idempotencyKeyRef.current = null;

      if (!result.success) {
        toast.error(result.message);
        await loadPayments();
        return;
      }

      toast.success(result.message);
      await loadPayments();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPayingId(null);
    }
  };

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="mb-5">
        <h2 className="fw-bold">Payments</h2>
        <p className="text-muted">View your payment history</p>
      </div>

      {/* Payments List */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {payments.length > 0 ? (
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {payments.map((payment, index) => {
                  return (
                    <tbody key={payment._id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{payment.orderId}</td>
                        <td>${payment.order.amount}</td>
                        <td>{payment.order.quantity}</td>
                        <td>
                          <span
                            className={
                              payment.status === "Success"
                                ? "badge text-bg-success"
                                : payment.status === "Pending"
                                  ? "badge text-bg-warning"
                                  : payment.status === "Failed"
                                    ? "badge text-bg-danger"
                                    : "badge text-bg-secondary"
                            }>
                            {payment.status}
                          </span>
                        </td>

                        <td>
                          {payment.status === "Pending" ||
                          payment.status === "Failed" ? (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handlePayOrder(payment._id)}
                              disabled={
                                isPayingId && isPayingId === payment._id
                              }
                              style={{
                                cursor:
                                  isPayingId && isPayingId === payment._id
                                    ? "not-allowed"
                                    : "pointer",
                              }}>
                              {isPayingId && isPayingId === payment._id
                                ? "Paying..."
                                : "Pay now"}
                            </button>
                          ) : payment.status === "Success" ? (
                            <p style={{ color: "green" }}>
                              <strong>{payment.status}</strong>
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>{payment.status}</p>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            ) : (
              <div>Payment not found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
