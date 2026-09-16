const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getOrdersApi = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result;
};

export const cancelOrdersApi = async (id) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/orders/${id}/cancel`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result;
};
