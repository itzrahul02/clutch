import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      const nextPath = location.state?.from?.pathname || '/';
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-lg border border-zinc-700/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-[fadeIn_0.5s_ease-out]">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Sign in</h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base">Access coordinator and admin features.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <input
              type="email"
              className="w-full rounded-lg bg-zinc-950/80 border border-zinc-700 p-3 sm:p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              className="w-full rounded-lg bg-zinc-950/80 border border-zinc-700 p-3 sm:p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error ? <p className="text-red-400 text-sm bg-red-950/30 border border-red-900/50 rounded-lg p-3">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 p-3 sm:p-3.5 font-semibold text-lg shadow-lg hover:shadow-red-600/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Signing in...
              </span>
            ) : 'Sign in'}
          </button>
        </form>

        <p className="text-zinc-400 mt-6 text-sm text-center">
          New here?{' '}
          <Link to="/register" className="text-red-400 hover:text-red-300 font-medium transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
