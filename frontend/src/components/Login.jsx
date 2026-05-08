import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Navbar from './Navbar';

const Login = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen bg-orange-50/30 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl shadow-orange-100 border border-orange-100 overflow-hidden">
          <div className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-black text-orange-950 mb-2">Welcome Back</h1>
              <p className="text-slate-500 font-medium">Log in to manage your bookmarks</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3">
                <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-orange-900 uppercase tracking-wider mb-2 ml-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-orange-900 uppercase tracking-wider mb-2 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </div>

          <div className="bg-orange-50/50 p-6 border-t border-orange-100 text-center">
            <p className="text-sm font-bold text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-600 hover:text-orange-700 underline decoration-2 underline-offset-4">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
