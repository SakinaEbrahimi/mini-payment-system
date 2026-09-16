const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const loginApi = async (data) => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Login Failed");

  return result;
};

export const registerApi = async (data) => {
  const response = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Registration Failed");

  return result;
};

export const logOutApi = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  return {
    success: true,
  };
};

export const myProfile = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BACKEND_URL}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result.result;
};
