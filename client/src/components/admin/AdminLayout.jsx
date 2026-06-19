import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../api/admin';
import '../../styles/admin.css';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/menu', label: 'Menu' },
  { to: '/admin/reservations', label: 'Reservations' },
  { to: '/admin/contacts', label: 'Messages' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    adminLogout();
    navigate('/admin/login');
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>Savory Haven</span>
          <small>Admin Panel</small>
        </div>

        <nav className="admin-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-link">
            View Website
          </a>
          <button type="button" className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
