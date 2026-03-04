const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
const JSON_SERVER_URL =
  import.meta.env.VITE_JSON_SERVER_URL || "http://localhost:5000";

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function handleResponse(res) {
  const data = await res.json();

  if (!res.ok) {
    throw new APIError(data.message || "An error occurred", res.status);
  }

  return data;
}

export const api = {
  // Auth endpoints
  signup: (email, password, passwordConfirm) =>
    fetch(`${API_BASE}/api/v1/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, passwordConfirm }),
    }).then(handleResponse),

  login: (email, password) =>
    fetch(`${API_BASE}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  logout: () =>
    fetch(`${API_BASE}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    }).then(handleResponse),

  getMe: () =>
    fetch(`${API_BASE}/api/v1/users/me`, {
      credentials: "include",
    }).then(handleResponse),

  // Watchlist endpoints
  addToWatchlist: (coin) =>
    fetch(`${API_BASE}/api/v1/users/watchlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(coin),
    }).then(handleResponse),

  removeFromWatchlist: (coin) =>
    fetch(`${API_BASE}/api/v1/users/watchlist`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(coin),
    }).then(handleResponse),

  // Market endpoints
  getMarketData: () => fetch(`${JSON_SERVER_URL}/market`).then(handleResponse),
};

export { APIError };
