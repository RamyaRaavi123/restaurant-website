import { useState } from 'react';
import '../styles/pages.css';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80';

export default function MenuCard({ item }) {
  const [imgSrc, setImgSrc] = useState(item.image || FALLBACK_IMAGE);

  return (
    <article className="menu-card">
      <div className="menu-card-image">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
      </div>
      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{item.name}</h3>
          <span className="menu-card-price">${item.price.toFixed(2)}</span>
        </div>
        <p className="menu-card-desc">{item.description}</p>
        <div className="menu-card-badges">
          {item.isFeatured && <span className="badge badge-featured">Featured</span>}
          {item.isVegetarian && <span className="badge badge-veg">Vegetarian</span>}
          {item.isSpicy && <span className="badge badge-spicy">Spicy</span>}
        </div>
      </div>
    </article>
  );
}
