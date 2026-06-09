import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterAuth() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('player');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ name, email, password, role });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Create account</h1>
        <p className="text-zinc-400 mb-6">Use this account for protected admin/coordinator APIs.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <select
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="player">Player</option>
            <option value="coordinator">Coordinator</option>
            <option value="admin">Admin</option>
          </select>

          {error ? <p className="text-red-400 text-sm">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 hover:bg-red-500 transition p-3 font-semibold"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="text-zinc-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-red-400 hover:text-red-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
