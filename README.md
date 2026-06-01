# Nexus — Full-Stack Landing Page

> React 18 + Node.js + Express + MongoDB · Responsive · Interactive Navbar · Contact Form API

---

## 📁 Project Structure

```
nexus-fullstack/
├── frontend/                  # React 18 app (Create React App)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     ← Fixed nav: scroll color change + hover effects
│   │   │   ├── Navbar.css
│   │   │   ├── Hero.jsx       ← Animated hero section
│   │   │   ├── Hero.css
│   │   │   ├── Services.jsx   ← Services with reveal animations
│   │   │   ├── Sections.jsx   ← Work, Process, Team, Marquee, Footer
│   │   │   ├── Sections.css
│   │   │   ├── Contact.jsx    ← Form → POST /api/contact → MongoDB
│   │   │   └── Contact.css
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── backend/                   # Express + Mongoose API
│   ├── models/
│   │   ├── Contact.js         ← Contact form submissions
│   │   └── Subscriber.js      ← Newsletter subscribers
│   ├── routes/
│   │   ├── contact.js         ← POST/GET /api/contact
│   │   └── subscribe.js       ← POST/GET /api/subscribe
│   ├── server.js              ← Entry point, middleware, DB connect
│   ├── .env.example
│   └── package.json
│
├── package.json               ← Root scripts (run both with one command)
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **MongoDB** running locally OR a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1 — Install all dependencies
```bash
npm run install:all
```

### 2 — Configure environment variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env — set MONGO_URI at minimum
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# REACT_APP_API_URL=http://localhost:5000/api (default)
```

### 3 — Run both servers simultaneously
```bash
# From root folder
npm run dev
```

Or run them individually:
```bash
# Terminal 1
cd backend && npm run dev      # http://localhost:5000

# Terminal 2
cd frontend && npm start       # http://localhost:3000
```

---

## 🌐 API Reference

### Health check
```
GET /api/health
```

### Contact form
```
POST /api/contact
Content-Type: application/json

{
  "name":    "Alex Johnson",
  "email":   "alex@company.com",
  "subject": "Project inquiry",        // optional
  "message": "We'd like to discuss..." // min 10 chars
}
```
**Response 201:**
```json
{ "success": true, "message": "Your message has been received...", "id": "..." }
```

```
GET /api/contact?page=1&limit=20&status=new
```

```
PATCH /api/contact/:id/status
{ "status": "read" }   // new | read | replied | archived
```

### Newsletter subscribe
```
POST /api/subscribe
{ "email": "user@example.com", "source": "hero" }

GET /api/subscribe?page=1&limit=50
```

---

## 🧭 Navbar Behaviour

| State       | Effect                                        |
|-------------|-----------------------------------------------|
| Top of page | Transparent background, dark text             |
| Scrolled    | Frosted glass dark bg, blur backdrop filter   |
| Scrolling   | Gold gradient progress bar at bottom of nav   |
| Hover link  | Gold underline sweep + subtle background tint |
| Active link | White dot indicator below link text           |
| Mobile      | Hamburger → full-screen overlay menu          |

---

## 🔒 Security Features

- **Helmet.js** — HTTP security headers
- **Rate limiting** — 100 req/15 min globally; 5 contact submits/hour
- **CORS** — whitelist via `CLIENT_URL` env var
- **express-validator** — server-side input validation
- **Body size limit** — 10kb max payload

---

## 🗃️ MongoDB Collections

| Collection    | Description                        |
|---------------|------------------------------------|
| `contacts`    | Contact form submissions           |
| `subscribers` | Newsletter email subscribers       |

---

## 📦 Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, React Router, Axios           |
| Styling   | Plain CSS with CSS custom properties    |
| Animations| react-intersection-observer, CSS keyframes |
| Backend   | Node.js, Express 4                      |
| Database  | MongoDB + Mongoose                      |
| Security  | Helmet, express-rate-limit, CORS        |
| Dev tools | nodemon, concurrently                   |

---

## 🚢 Production Deployment

**Frontend** → Vercel / Netlify
```bash
cd frontend && npm run build
# Deploy the build/ folder
```

**Backend** → Railway / Render / Fly.io
```bash
# Set environment variables in your platform dashboard
# Start command: node server.js
```

**MongoDB** → MongoDB Atlas (free tier available)

---

## 📜 License
MIT — free to use, modify, and distribute.
