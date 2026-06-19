import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';

const statusOptions = ['pending', 'confirmed', 'cancelled'];

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function loadReservations() {
    setLoading(true);
    adminApi
      .getReservations()
      .then(setReservations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadReservations();
  }, []);

  async function handleStatusChange(id, status) {
    try {
      await adminApi.updateReservationStatus(id, status);
      loadReservations();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Reservations</h1>
        <p>Manage table bookings</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading reservations...</div>
      ) : reservations.length === 0 ? (
        <div className="admin-empty">No reservations yet.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Date & Time</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Requests</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r._id}>
                  <td>
                    <strong>{r.name}</strong>
                    <small>{r.email}</small>
                    <small>{r.phone}</small>
                  </td>
                  <td>
                    {r.date}
                    <small>{r.time}</small>
                  </td>
                  <td>{r.guests}</td>
                  <td>
                    <select
                      className={`status-select status-${r.status}`}
                      value={r.status}
                      onChange={(e) => handleStatusChange(r._id, e.target.value)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{r.specialRequests || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
