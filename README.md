# Hacker News Scraper - MERN Stack Assignment

This is a full-stack mini application built with the MERN stack (MongoDB, Express, React, Node.js) that scrapes the top stories from Hacker News, provides an authentication system, and allows users to bookmark their favorite tech news.

## 🚀 Live Demo
- **Frontend:** [https://indeed-dacby-assignment.vercel.app](https://indeed-dacby-assignment.vercel.app)
- **Backend API:** [https://indeed-dacby-assignment.onrender.com](https://indeed-dacby-assignment.onrender.com)

---

## 🛠 Features

### 1. Web Scraper
- Automatically scrapes the top 10 stories from [Hacker News](https://news.ycombinator.com) on server startup.
- Can be manually triggered via `POST /api/stories/scrape`.
- Extracts: Title, URL, Points, Author, and Posted Time.

### 2. Backend (Node.js + Express)
- **Authentication:** JWT-based Register and Login.
- **Story Management:** 
  - Fetch stories with **pagination** support.
  - Sorted by points in descending order by default.
  - Detailed view for individual stories.
- **Bookmarks:** Authenticated toggle system for saving stories.

### 3. Frontend (React + Vite)
- **Modern UI:** Built with Tailwind CSS 4.
- **State Management:** React Context API for authentication.
- **Routing:** React Router 7 with protected routes for bookmarks.
- **UX:** Loading skeletons, interactive hover states, and responsive design.

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/      # Database and Constants
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth & Error handling
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Scraper logic
│   │   └── server.js    # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── context/     # Auth Context
│   │   ├── hooks/       # Custom hooks (useStories)
│   │   ├── services/    # API calling layer
│   │   └── App.jsx      # Main routing
└── vercel.json          # Deployment config
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- pnpm / npm / yarn

### 1. Backend Setup
```bash
cd backend
pnpm install
```
Create a `.env` file in the `backend/` folder:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
CORS_ORIGIN=http://localhost:5173
```
Run the backend:
```bash
pnpm run dev
```

### 2. Frontend Setup
```bash
cd frontend
pnpm install
```
Create a `.env` file in the `frontend/` folder:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```
Run the frontend:
```bash
pnpm run dev
```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token

### Stories
- `GET /api/stories?page=1&limit=10` - List stories (Paginated)
- `GET /api/stories/:id` - Get story details
- `POST /api/stories/:id/bookmark` - Toggle bookmark (Auth Required)
- `POST /api/stories/scrape` - Trigger manual scrape

---

## 📝 Assignment Requirements Fulfilled
- [x] Scraper for top 10 HN stories.
- [x] Data storage in MongoDB.
- [x] JWT Authentication.
- [x] Story listing and detail pages.
- [x] Bookmark toggle functionality.
- [x] Protected Bookmarks page.
- [x] Pagination (Bonus).
- [x] Live Deployment (Bonus).
- [x] Meaningful commit history.

---

## 👨‍💻 Author
**Mohit**  
Full Stack Developer Candidate
