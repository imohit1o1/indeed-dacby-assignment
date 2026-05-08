import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const auth = isAuthenticated();

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl italic">Y</span>
          </div>
          <span className="text-xl font-black text-orange-950 tracking-tight">YCombinator</span>
        </Link>

        <div className="flex items-center gap-6">
          <NavLink 
            to="/stories" 
            className={({ isActive }) => 
              `text-sm font-bold transition-colors ${isActive ? 'text-orange-600' : 'text-slate-600 hover:text-orange-500'}`
            }
          >
            Stories
          </NavLink>

          {auth && (
            <NavLink 
              to="/bookmarks" 
              className={({ isActive }) => 
                `text-sm font-bold transition-colors ${isActive ? 'text-orange-600' : 'text-slate-600 hover:text-orange-500'}`
              }
            >
              Bookmarks
            </NavLink>
          )}

          <div className="h-6 w-[1px] bg-orange-100 mx-2" />

          <a 
            href="https://github.com/imohit1o1/indeed-dacby-assignment" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-orange-600 transition-colors flex items-center"
            title="View on GitHub"
          >
            <FaGithub size={22} />
          </a>

          <div className="h-6 w-[1px] bg-orange-100 mx-2" />

          {auth ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-xs font-medium text-slate-500">
                Hi, <span className="text-orange-900 font-bold">{user.username}</span>
              </span>
              <button
                onClick={logout}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-all shadow-sm active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
