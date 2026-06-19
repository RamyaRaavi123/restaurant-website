import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Savory Haven</div>
            <p className="footer-desc">
              A celebration of seasonal ingredients, crafted with passion and served
              with warmth. Experience fine dining in the heart of the city.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Hours</h4>
            <ul className="footer-links">
              <li>Mon – Thu: 5pm – 10pm</li>
              <li>Fri – Sat: 5pm – 11pm</li>
              <li>Sunday: 4pm – 9pm</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact</h4>
            <p>123 Culinary Lane</p>
            <p>New York, NY 10001</p>
            <p>(212) 555-0198</p>
            <p>hello@savoryhaven.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Savory Haven. All rights reserved.</span>
          <span>
            <a href="/admin/login" style={{ color: 'inherit' }}>Admin</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
