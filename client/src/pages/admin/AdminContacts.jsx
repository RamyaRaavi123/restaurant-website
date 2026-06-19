import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function loadContacts() {
    setLoading(true);
    adminApi
      .getContacts()
      .then(setContacts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return;
    try {
      await adminApi.deleteContact(id);
      loadContacts();
    } catch (err) {
      setError(err.message);
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Contact Messages</h1>
        <p>Messages from the contact form</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading messages...</div>
      ) : contacts.length === 0 ? (
        <div className="admin-empty">No messages yet.</div>
      ) : (
        <div className="admin-messages">
          {contacts.map((c) => (
            <article key={c._id} className="admin-message-card">
              <div className="admin-message-header">
                <div>
                  <strong>{c.name}</strong>
                  <span>{c.email}</span>
                </div>
                <time>{formatDate(c.createdAt)}</time>
              </div>
              <h3>{c.subject}</h3>
              <p>{c.message}</p>
              <button
                type="button"
                className="btn-sm btn-danger"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
