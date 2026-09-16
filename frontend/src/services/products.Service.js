const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProductsApi = async (searchQuery) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BACKEND_URL}/products?search=${encodeURIComponent(searchQuery)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result;
};

export const getProductByIdApi = async (id) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result;
};

export const buyProduct = async (id, data) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/products/${id}/buy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result.message;
};
