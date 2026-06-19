import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const contact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      message: 'Thank you for reaching out! We will get back to you soon.',
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

export default router;
