import { useEffect, useState } from 'react';
import { fetchMenu } from '../api';
import MenuCard from '../components/MenuCard';
import '../styles/pages.css';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Mains' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'drinks', label: 'Drinks' },
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const category = activeCategory === 'all' ? null : activeCategory;

    fetchMenu(category)
      .then(setItems)
      .catch(() => setError('Unable to load menu. Please try again later.'))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Our Offerings</span>
          <h1 className="section-title">The Menu</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Explore our carefully crafted dishes, from elegant starters to indulgent desserts.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="menu-filters">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="loading">Loading menu...</div>
          ) : items.length === 0 ? (
            <div className="loading">No items found in this category.</div>
          ) : (
            <div className="menu-grid">
              {items.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
