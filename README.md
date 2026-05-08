# Hacker News Scraper - MERN Stack Assignment

This is a full-stack mini application built with the MERN stack (MongoDB, Express, React, Node.js) that scrapes the top stories from Hacker News, provides an authentication system, and allows users to bookmark their favorite tech news.

## 🚀 Live Demo
- **Frontend:** [https://indeed-dacby-assignment.vercel.app](https://indeed-dacby-assignment.vercel.app)
- **Backend API:** [https://indeed-dacby-assignment.onrender.com](https://indeed-dacby-assignment.onrender.com)
- **GitHub Repository:** [https://github.com/imohit1o1/indeed-dacby-assignment](https://github.com/imohit1o1/indeed-dacby-assignment)

---

## 🛠 Features

### 1. Web Scraper
- Automatically scrapes the top 10 stories from [Hacker News](https://news.ycombinator.com) on server startup.
- Can be manually triggered via `POST /api/stories/scrape`.
- Extracts: Title, URL, Points, Author, and Posted Time.

### 2. Backend (Node.js + Express)
- **Detailed Documentation:** [Backend README](./backend/README.md)
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
├── backend/             # Node.js + Express Backend
│   └── README.md        # Detailed Backend Documentation
├── frontend/            # React + Vite Frontend
└── README.md            # Root Project Documentation
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- pnpm / npm / yarn

### 1. Backend Setup
For detailed instructions, see the [Backend README](./backend/README.md#setup-instructions).
```bash
cd backend
pnpm install
pnpm run dev
```

### 2. Frontend Setup
```bash
cd frontend
pnpm install
pnpm run dev
```
Create a `.env` file in the `frontend/` folder:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 📝 Assignment Requirements Fulfilled
- [x] Scraper for top 10 HN stories.
- [x] Data storage in MongoDB.
- [x] JWT Authentication.
- [x] Story listing and detail pages.
- [x] Bookmark toggle functionality with success messages.
- [x] Protected Bookmarks page.
- [x] Pagination (Bonus).
- [x] Live Deployment (Bonus).
- [x] Meaningful commit history.

---

## 👨‍💻 Author
**Mohit**  
Full Stack Developer Candidate
