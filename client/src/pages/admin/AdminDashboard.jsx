import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api/admin';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi
      .getStats()
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Overview of your restaurant</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-label">Menu Items</span>
          <span className="admin-stat-value">{stats?.menuCount ?? '—'}</span>
          <Link to="/admin/menu" className="admin-stat-link">Manage menu</Link>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-label">Pending Reservations</span>
          <span className="admin-stat-value">{stats?.pendingCount ?? '—'}</span>
          <Link to="/admin/reservations" className="admin-stat-link">View reservations</Link>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-label">Total Reservations</span>
          <span className="admin-stat-value">{stats?.reservationCount ?? '—'}</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-label">Contact Messages</span>
          <span className="admin-stat-value">{stats?.contactCount ?? '—'}</span>
          <Link to="/admin/contacts" className="admin-stat-link">View messages</Link>
        </div>
      </div>
    </div>
  );
}
