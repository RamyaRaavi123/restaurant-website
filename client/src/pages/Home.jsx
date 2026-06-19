import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedMenu } from '../api';
import MenuCard from '../components/MenuCard';
import '../styles/home.css';

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedMenu()
      .then(setDishes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-label">Fine Dining Experience</p>
          <h1 className="hero-title">
            Where Every Meal Becomes a <em>Memory</em>
          </h1>
          <p className="hero-subtitle">
            Seasonal cuisine, artisan cocktails, and an atmosphere of refined elegance
            in the heart of the city.
          </p>
          <div className="hero-actions">
            <Link to="/reservations" className="btn btn-primary">
              Book a Table
            </Link>
            <Link to="/menu" className="btn btn-outline">
              View Menu
            </Link>
          </div>
        </div>
      </section>

      <section className="section features">
        <div className="container">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">An Unforgettable Experience</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Seasonal Menu</h3>
              <p>
                Our chef curates a rotating menu using the freshest local and
                imported ingredients each season.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍷</div>
              <h3>Curated Wine List</h3>
              <p>
                Over 200 selections from renowned vineyards, expertly paired with
                every course by our sommelier.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Intimate Ambiance</h3>
              <p>
                Soft lighting, live jazz on weekends, and attentive service create
                the perfect setting for any occasion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section featured-dishes">
        <div className="container">
          <span className="section-label">Chef's Selection</span>
          <h2 className="section-title">Featured Dishes</h2>
          <p className="section-subtitle">
            Handpicked favorites from our kitchen, crafted with passion and precision.
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="loading">Loading featured dishes...</div>
          ) : !error && (
            <div className="dishes-grid">
              {dishes.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/menu" className="btn btn-outline">
              See Full Menu
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <span className="section-label">Join Us Tonight</span>
          <h2 className="section-title">Reserve Your Table</h2>
          <p>
            Whether it's a romantic dinner, a celebration, or a quiet evening out,
            we'd love to welcome you.
          </p>
          <Link to="/reservations" className="btn btn-primary">
            Make a Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
