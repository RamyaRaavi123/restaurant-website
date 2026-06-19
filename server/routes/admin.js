import express from 'express';
import jwt from 'jsonwebtoken';
import MenuItem from '../models/MenuItem.js';
import Reservation from '../models/Reservation.js';
import Contact from '../models/Contact.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@savoryhaven.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({ token, email });
});

router.use(requireAuth);

router.get('/stats', async (_req, res) => {
  try {
    const [menuCount, reservationCount, pendingCount, contactCount] = await Promise.all([
      MenuItem.countDocuments(),
      Reservation.countDocuments(),
      Reservation.countDocuments({ status: 'pending' }),
      Contact.countDocuments(),
    ]);

    res.json({ menuCount, reservationCount, pendingCount, contactCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load stats', error: error.message });
  }
});

router.get('/menu', async (_req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
});

router.post('/menu', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create menu item', error: error.message });
  }
});

router.put('/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update menu item', error: error.message });
  }
});

router.delete('/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete menu item', error: error.message });
  }
});

router.get('/reservations', async (_req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reservations', error: error.message });
  }
});

router.patch('/reservations/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update reservation', error: error.message });
  }
});

router.get('/contacts', async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
});

router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
});

export default router;
