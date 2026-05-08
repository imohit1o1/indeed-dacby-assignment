# Hacker News Scraper - Frontend

Modern React application built with Vite and Tailwind CSS that provides a sleek, interactive interface for browsing Hacker News stories and managing bookmarks.

## 🚀 Features

- **Dynamic Story Feed**: View top stories with real-time pagination and sorting.
- **Detailed Story View**: Dedicated pages for each story with deep-dive details.
- **Smart Bookmarking**: Instant UI updates when saving or removing stories.
- **Authentication System**: Secure login and registration with protected routes.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Sync with HN**: Manual trigger to refresh data from Hacker News.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **State Management**: React Context API
- **Icons**: [React Icons (FontAwesome)](https://react-icons.github.io/react-icons/)
- **API Client**: [Axios](https://axios-http.com/)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # UI Components (Navbar, Stories, Detail, etc.)
│   ├── context/         # AuthContext & AuthProvider
│   ├── hooks/           # Custom hooks (useStories, useAuth)
│   ├── services/        # API and Storage services
│   ├── utils/           # Formatters and helpers
│   ├── constants/       # API Routes and App constants
│   ├── App.jsx          # Main routing and layout
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
└── README.md            # This file
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- pnpm or npm

### Installation

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Running the Application

**Development mode:**

```bash
pnpm run dev
# or
npm run dev
```

The app will start on `http://localhost:5173` (or the next available port).

## 🧩 Key Components

- **`StoriesList`**: Manages the grid of story cards and pagination.
- **`StoryCard`**: Displays story metadata and the bookmark toggle.
- **`StoryDetail`**: A rich-text view for individual story deep-links.
- **`Navbar`**: Handles navigation and displays user session status.
- **`ProtectedRoute`**: Higher-order component to guard private routes.

## 🔐 State Management

The application uses the **React Context API** to manage global authentication state:
- **AuthProvider**: Persists user data and tokens in LocalStorage.
- **useAuth**: Custom hook for accessing login, logout, and user info anywhere.
- **useStories**: Encapsulates story fetching, pagination, and bookmarking logic.

## 🎨 Design System

- **Color Palette**: Focused on "Hacker News Orange" (#ff6600) with soft slate backgrounds.
- **Typography**: Clean, sans-serif stack for high readability.
- **Animations**: Subtle transitions and hover scales for a premium feel.
- **Empty States**: Custom illustrations and messages for zero-bookmark states.

## 🚀 Deployment

### Vercel (Recommended)

This project includes a `vercel.json` configured for SPA routing (redirecting all paths to `index.html`).

**Build Command:** `npm run build`
**Output Directory:** `dist`

---

Built as part of a MERN stack assessment.
