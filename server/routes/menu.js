import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const items = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu item', error: error.message });
  }
});

export default router;
