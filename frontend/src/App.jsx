import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Stories from './components/Stories';
import Bookmarks from './components/Bookmarks';
import StoryDetail from './components/StoryDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-orange-50">
        <div className="text-xl text-orange-900 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <main className="grow">
          <Routes>
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/login" element={user ? <Navigate to="/stories" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/stories" replace /> : <Register />} />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/stories" replace />} />
            <Route path="*" element={<Navigate to="/stories" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
