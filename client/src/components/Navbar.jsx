import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/admin/login', label: 'Admin', admin: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          Savory <span>Haven</span>
        </NavLink>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>

        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  [isActive ? 'active' : '', link.admin ? 'navbar-admin' : ''].filter(Boolean).join(' ')
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/reservations"
              className="navbar-cta"
              onClick={() => setOpen(false)}
            >
              Reserve a Table
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
