import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import menuRoutes from './routes/menu.js';
import reservationRoutes from './routes/reservations.js';
import contactRoutes from './routes/contact.js';
import adminRoutes, { adminLoginHandler } from './routes/admin.js';
import { requireAuth } from './middleware/auth.js';
import { connectDb, printMongoHelp } from './db/connect.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'dev-only-jwt-secret-change-me';
  console.warn('JWT_SECRET not set — using insecure default. Set it in server/.env for production.');
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function requireDb(_req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message:
        'Database not connected. Start MongoDB locally or update MONGODB_URI in server/.env, then restart the server.',
    });
  }
  next();
}

app.get('/', (_req, res) => {
  res.json({
    message: 'Savory Haven API server',
    note: 'Open the website at http://localhost:3000 (not this port).',
    endpoints: {
      health: 'GET /api/health',
      menu: 'GET /api/menu',
      featuredMenu: 'GET /api/menu?featured=true',
      reservations: 'POST /api/reservations',
      contact: 'POST /api/contact',
    },
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Savory Haven API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api', (_req, res) => {
  res.json({
    message: 'Savory Haven API',
    routes: [
      '/api/health',
      '/api/menu',
      '/api/reservations',
      '/api/contact',
      '/api/admin/login',
      '/api/admin/stats',
    ],
  });
});

app.get('/api/admin/ping', (_req, res) => {
  res.json({ status: 'ok', message: 'Admin API is available' });
});

app.post('/api/admin/login', adminLoginHandler);

app.use('/api/menu', requireDb, menuRoutes);
app.use('/api/reservations', requireDb, reservationRoutes);
app.use('/api/contact', requireDb, contactRoutes);
app.use('/api/admin', requireDb, requireAuth, adminRoutes);

app.use((_req, res) => {
  res.status(404).json({
    message: 'API route not found',
    hint: 'Try GET /api/health or GET /api/menu. The website runs at http://localhost:3000',
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDb()
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    printMongoHelp(error);
    console.error('API will return 503 until MongoDB is available.');
  });
