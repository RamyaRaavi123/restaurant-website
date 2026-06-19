const API_BASE = '/api/admin';
const TOKEN_KEY = 'admin_token';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

async function parseJsonResponse(res) {
  const text = await res.text();
  if (!text) {
    throw new Error(
      res.ok
        ? 'Server returned an empty response.'
        : `API unavailable (${res.status}). Ensure the backend is running.`
    );
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Server returned invalid JSON (${res.status}).`);
  }
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await parseJsonResponse(res);

  if (res.status === 401 && path !== '/login') {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/admin/login';
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export async function adminLogin(email, password) {
  const data = await adminFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  saveToken(data.token);
  return data;
}

export function adminLogout() {
  clearToken();
}

export const adminApi = {
  getStats: () => adminFetch('/stats'),
  getMenu: () => adminFetch('/menu'),
  createMenuItem: (item) => adminFetch('/menu', { method: 'POST', body: JSON.stringify(item) }),
  updateMenuItem: (id, item) =>
    adminFetch(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
  deleteMenuItem: (id) => adminFetch(`/menu/${id}`, { method: 'DELETE' }),
  getReservations: () => adminFetch('/reservations'),
  updateReservationStatus: (id, status) =>
    adminFetch(`/reservations/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getContacts: () => adminFetch('/contacts'),
  deleteContact: (id) => adminFetch(`/contacts/${id}`, { method: 'DELETE' }),
};
