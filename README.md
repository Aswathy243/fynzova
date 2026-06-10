# 💰 FYNZOVA — Personal Finance Tracker

A full stack web application to track daily income and expenses, visualize spending patterns, and download monthly financial reports.

**Live Demo:**(https://fynzova-rho.vercel.app/)

> Note: The backend is hosted on Render's free tier. First load may take 30–60 seconds to wake up.

---

## Features

- **User Authentication** — Secure register and login with JWT and bcrypt password hashing
- **Transaction Management** — Add, edit, and delete income and expense entries
- **Dashboard Overview** — View total income, total expense, and monthly profit or loss at a glance
- **Daily Expense Chart** — Bar chart showing daily spending for the selected month
- **Yearly Overview Chart** — Line chart comparing income vs expense across all 12 months
- **Category Breakdown** — Donut chart showing which categories consume the most budget
- **PDF Reports** — Download a formatted monthly or yearly financial report
- **Protected Routes** — All data is private and user-specific

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| State Management | Zustand |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## Project Structure

```
finance-tracker/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Login, Register, Dashboard
│   │   ├── store/           # Zustand auth store
│   │   └── utils/           # Axios API instance
│   └── package.json
│
└── server/                  # Node/Express backend
    ├── config/              # MongoDB connection
    ├── middleware/          # JWT auth middleware
    ├── models/              # User and Transaction schemas
    ├── routes/              # Auth and transaction API routes
    └── index.js             # Server entry point
```

---

## Getting Started Locally

### Prerequisites

- Node.js v18+
- MongoDB installed and running locally

### 1. Clone the repository

```bash
git clone https://github.com/Aswathy243/moneymint.git
cd moneymint
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm start
```

The app will open at `http://localhost:3000`

---

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get JWT token |

### Transaction Routes (Protected)
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/transactions | Get all transactions |
| POST | /api/transactions | Add a new transaction |
| PUT | /api/transactions/:id | Update a transaction |
| DELETE | /api/transactions/:id | Delete a transaction |
| GET | /api/transactions/summary | Get monthly P&L summary |

---

## Environment Variables

### Server
| Variable | Description |
|---|---|
| PORT | Port the server runs on |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for signing JWT tokens |
| NODE_ENV | Set to `production` on deployment |

---

## Deployment

| Service | Purpose |
|---|---|
| Vercel | Hosts the React frontend |
| Render | Hosts the Node/Express backend |
| MongoDB Atlas | Cloud database |

---

## Screenshots

### Login Page
Dark themed login with MONEYMINT branding

### Dashboard
Summary cards, daily expense bar chart, yearly line chart, and category donut chart

### Transactions
Add, edit, delete transactions with inline editing and PDF report download

---

## What I Learned

- Building a full stack MERN application from scratch
- JWT authentication flow with protected API routes
- MongoDB data modelling and aggregation queries
- React state management with Zustand
- Data visualization with Recharts
- Deploying a full stack app across multiple cloud platforms

---

## Author

**Aswathy** — [github.com/Aswathy243](https://github.com/Aswathy243)
