import { useState } from 'react';
import { submitReservation } from '../api';
import '../styles/pages.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  specialRequests: '',
};

export default function Reservations() {
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
      const result = await submitReservation(form);
      setMessage({ type: 'success', text: result.message });
      setForm(initialForm);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Book Your Visit</span>
          <h1 className="section-title">Reservations</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Reserve your table online. We'll confirm your booking within the hour.
          </p>
        </div>
      </header>

      <section className="section form-page">
        <div className="container">
          <div className="form-card">
            {message.text && (
              <div className={`alert alert-${message.type}`}>{message.text}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Guests *</label>
                  <select
                    id="guests"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time *</label>
                  <select
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={form.specialRequests}
                  onChange={handleChange}
                  placeholder="Allergies, celebrations, seating preferences..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Submitting...' : 'Confirm Reservation'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
