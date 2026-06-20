const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

async function parseJsonResponse(res) {
  const text = await res.text();

  if (!text) {
    throw new Error(
      res.ok
        ? 'Server returned an empty response.'
        : `API unavailable (${res.status}). Start the backend with "npm run dev" and ensure MongoDB is running.`
    );
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Server returned invalid JSON (${res.status}).`);
  }
}

export async function fetchMenu(category) {
  const params = category ? `?category=${category}` : '';
  const res = await fetch(`${API_BASE}/menu${params}`);
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load menu');
  return data;
}

export async function fetchFeaturedMenu() {
  const res = await fetch(`${API_BASE}/menu?featured=true`);
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load featured dishes');
  return data;
}

export async function submitReservation(formData) {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.message || 'Reservation failed');
  return data;
}

export async function submitContact(formData) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.message || 'Failed to send message');
  return data;
}
