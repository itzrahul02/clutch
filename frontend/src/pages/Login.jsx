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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Sign in</h1>
        <p className="text-zinc-400 mb-6">Access coordinator and admin features.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error ? <p className="text-red-400 text-sm">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 hover:bg-red-500 transition p-3 font-semibold"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-zinc-400 mt-6 text-sm">
          New here?{' '}
          <Link to="/register" className="text-red-400 hover:text-red-300">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
