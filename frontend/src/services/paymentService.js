const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const payOrderPaymentsApi = async (id, idempotencyKey) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/payments/${id}/pay`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "idempotency-key": idempotencyKey,
    },
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result;
};

export const getPaymentsApi = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/payments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result;
};

export const getPaymentByOrderIdApi = async (orderId) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/payments/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result;
};
