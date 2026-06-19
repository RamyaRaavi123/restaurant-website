import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';

const emptyItem = {
  name: '',
  description: '',
  price: '',
  category: 'mains',
  image: '',
  isFeatured: false,
  isVegetarian: false,
  isSpicy: false,
};

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyItem);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function loadMenu() {
    setLoading(true);
    adminApi
      .getMenu()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadMenu();
  }, []);

  function openCreate() {
    setForm(emptyItem);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isFeatured: item.isFeatured,
      isVegetarian: item.isVegetarian,
      isSpicy: item.isSpicy,
    });
    setEditingId(item._id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyItem);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = { ...form, price: Number(form.price) };

    try {
      if (editingId) {
        await adminApi.updateMenuItem(editingId, payload);
      } else {
        await adminApi.createMenuItem(payload);
      }
      closeForm();
      loadMenu();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this menu item?')) return;
    try {
      await adminApi.deleteMenuItem(id);
      loadMenu();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Menu Management</h1>
          <p>Add, edit, or remove dishes</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Add Item
        </button>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading menu...</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Flags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                  </td>
                  <td>{item.category}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="admin-tags">
                      {item.isFeatured && <span className="badge badge-featured">Featured</span>}
                      {item.isVegetarian && <span className="badge badge-veg">Veg</span>}
                      {item.isSpicy && <span className="badge badge-spicy">Spicy</span>}
                    </div>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" className="btn-sm" onClick={() => openEdit(item)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-sm btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                  <option value="starters">Starters</option>
                  <option value="mains">Mains</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input id="image" name="image" value={form.image} onChange={handleChange} />
              </div>
            </div>

            <div className="admin-checkboxes">
              <label>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                />
                Featured
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={form.isVegetarian}
                  onChange={handleChange}
                />
                Vegetarian
              </label>
              <label>
                <input type="checkbox" name="isSpicy" checked={form.isSpicy} onChange={handleChange} />
                Spicy
              </label>
            </div>

            <div className="admin-modal-actions">
              <button type="button" className="btn btn-outline" onClick={closeForm}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
