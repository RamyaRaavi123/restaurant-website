import { useState } from 'react';
import { submitContact } from '../api';
import '../styles/pages.css';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await submitContact(form);
      setMessage({ type: 'success', text: result.message });
      setForm(initialForm);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a question or special request? We'd love to hear from you.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="contact-info-card">
              <div className="contact-info-item">
                <h4>Location</h4>
                <p>
                  123 Culinary Lane
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div className="contact-info-item">
                <h4>Phone</h4>
                <p>(212) 555-0198</p>
              </div>
              <div className="contact-info-item">
                <h4>Email</h4>
                <p>hello@savoryhaven.com</p>
              </div>
              <div className="contact-info-item">
                <h4>Hours</h4>
                <table className="hours-table">
                  <tbody>
                    <tr><td>Mon – Thu</td><td>5pm – 10pm</td></tr>
                    <tr><td>Fri – Sat</td><td>5pm – 11pm</td></tr>
                    <tr><td>Sunday</td><td>4pm – 9pm</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="form-card">
            {message.text && (
              <div className={`alert alert-${message.type}`}>{message.text}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
