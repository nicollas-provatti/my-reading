const API_URL = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw error;
  }

  return response.json();
}

export async function register(email, password, passwordConfirm) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, passwordConfirm }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw error;
  }

  return response.json();
}
