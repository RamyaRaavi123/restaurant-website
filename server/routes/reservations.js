import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const reservation = await Reservation.create({
      name,
      email,
      phone,
      date,
      time,
      guests: Number(guests),
      specialRequests: specialRequests || '',
    });

    res.status(201).json({
      message: 'Reservation submitted successfully! We will confirm shortly.',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
});

export default router;
