import React, { useState } from 'react';
import client from '../api/client';

export default function AdminGames() {
  const [name, setName] = useState('');
  const [minPlayers, setMinPlayers] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [img, setImg] = useState('');
  const [rules, setRules] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await client.post('/api/games/add', {
        name,
        minPlayers,
        maxPlayers,
        img,
        rules: rules
          .split('\n')
          .map((rule) => rule.trim())
          .filter(Boolean),
      });

      setMessage('Game created successfully');
      setName('');
      setMinPlayers(1);
      setMaxPlayers(1);
      setImg('');
      setRules('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-4 sm:p-6 pt-20 sm:pt-24">
      <div className="max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-lg border border-zinc-700/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Create Game</h1>
          <p className="text-zinc-400 mt-2 text-sm">Add a new game to the tournament lineup.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-zinc-400 font-medium mb-1 block">Game Name</label>
            <input
              className="w-full rounded-lg bg-zinc-950/80 border border-zinc-700 p-3 sm:p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
              placeholder="e.g. Valorant, BGMI, IGI..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400 font-medium mb-1 block">Min Players</label>
              <input
                type="number"
                min="1"
                className="w-full rounded-lg bg-zinc-950/80 border border-zinc-700 p-3 sm:p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                placeholder="Min players"
                value={minPlayers}
                onChange={(e) => setMinPlayers(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400 font-medium mb-1 block">Max Players</label>
              <input
                type="number"
                min="1"
                className="w-full rounded-lg bg-zinc-950/80 border border-zinc-700 p-3 sm:p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                placeholder="Max players"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-400 font-medium mb-1 block">Image URL</label>
            <input
              className="w-full rounded-lg bg-zinc-950/80 border border-zinc-700 p-3 sm:p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
              placeholder="https://example.com/game-image.jpg"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
            {img && (
              <div className="mt-2 rounded-lg overflow-hidden border border-zinc-700 w-20 h-20">
                <img src={img} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-zinc-400 font-medium mb-1 block">Rules (one per line)</label>
            <textarea
              className="w-full rounded-lg bg-zinc-950/80 border border-zinc-700 p-3 sm:p-3.5 min-h-36 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 resize-y"
              placeholder="Enter game rules, one per line..."
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              required
            />
          </div>

          {message ? <p className="text-green-400 text-sm bg-green-950/30 border border-green-900/50 rounded-lg p-3 flex items-center gap-2">✓ {message}</p> : null}
          {error ? <p className="text-red-400 text-sm bg-red-950/30 border border-red-900/50 rounded-lg p-3">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 p-3 sm:p-3.5 font-semibold text-lg shadow-lg hover:shadow-red-600/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Saving...
              </span>
            ) : 'Save game'}
          </button>
        </form>
      </div>
    </div>
  );
}
