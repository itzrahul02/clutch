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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

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
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-700 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">Create Game</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
            placeholder="Game name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              min="1"
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
              placeholder="Min players"
              value={minPlayers}
              onChange={(e) => setMinPlayers(Number(e.target.value))}
              required
            />
            <input
              type="number"
              min="1"
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
              placeholder="Max players"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              required
            />
          </div>
          <input
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
          <textarea
            className="w-full rounded-md bg-zinc-950 border border-zinc-700 p-3 min-h-36"
            placeholder="Rules (one per line)"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            required
          />

          {message ? <p className="text-green-400">{message}</p> : null}
          {error ? <p className="text-red-400">{error}</p> : null}

          <button type="submit" className="w-full rounded-md bg-red-600 hover:bg-red-500 transition p-3 font-semibold">
            Save game
          </button>
        </form>
      </div>
    </div>
  );
}
