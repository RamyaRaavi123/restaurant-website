# Savory Haven — Restaurant Website

A full-stack restaurant website built with **HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB**.

## Features

- **Home** — Hero section, features, and featured dishes from the database
- **Menu** — Filterable menu (Starters, Mains, Desserts, Drinks) loaded from MongoDB
- **About** — Restaurant story and stats
- **Reservations** — Online table booking stored in MongoDB
- **Contact** — Contact form with messages saved to MongoDB
- **Admin Dashboard** — Secure login to manage menu, reservations, and messages

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React, HTML, CSS, JavaScript (Vite) |
| Backend  | Node.js, Express.js                 |
| Database | MongoDB with Mongoose               |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

## Setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

Copy `server/.env.example` to `server/.env` and set your MongoDB URI:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/restaurant_db
JWT_SECRET=your-long-random-secret
ADMIN_EMAIL=admin@savoryhaven.com
ADMIN_PASSWORD=admin123
```

For MongoDB Atlas, use your Atlas connection string instead.

### 3. Seed the database

```bash
npm run seed
```

This loads 15 sample menu items into MongoDB.

### 4. Run the app

```bash
npm run dev
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Admin Dashboard:** http://localhost:3000/admin/login

Default admin credentials: `admin@savoryhaven.com` / `admin123` (change in `server/.env`).

## Admin Dashboard

| Page | URL | Features |
|------|-----|----------|
| Login | `/admin/login` | JWT authentication |
| Dashboard | `/admin` | Stats overview |
| Menu | `/admin/menu` | Add, edit, delete dishes |
| Reservations | `/admin/reservations` | View and update status |
| Messages | `/admin/contacts` | View and delete contact form submissions |

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/health`         | Health check             |
| GET    | `/api/menu`           | Get all menu items       |
| GET    | `/api/menu?category=` | Filter by category       |
| GET    | `/api/menu?featured=true` | Get featured dishes  |
| POST   | `/api/reservations`   | Create a reservation     |
| POST   | `/api/contact`        | Send a contact message   |
| POST   | `/api/admin/login`    | Admin login (returns JWT) |
| GET    | `/api/admin/stats`    | Dashboard stats (auth) |
| GET/POST/PUT/DELETE | `/api/admin/menu` | Menu CRUD (auth) |
| GET/PATCH | `/api/admin/reservations` | Manage reservations (auth) |
| GET/DELETE | `/api/admin/contacts` | Manage messages (auth) |

## Project Structure

```
Restuarant_Website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, MenuCard
│   │   ├── pages/          # Home, Menu, About, etc.
│   │   ├── styles/         # CSS files
│   │   └── api.js          # API helper functions
│   └── index.html
├── server/                 # Express backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── seed.js             # Database seeder
└── package.json            # Root scripts
```

## Build for Production

```bash
npm run build
```

The built frontend will be in `client/dist/`.
