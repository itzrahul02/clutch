import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import Nav from '../components/nav';

const statusStyles = {
  upcoming: 'bg-blue-500/20 text-blue-300',
  live: 'bg-red-500/20 text-red-300',
  completed: 'bg-zinc-700 text-zinc-300',
};

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = useMemo(
    () => ({ ...(status ? { status } : {}), ...(search ? { search } : {}) }),
    [status, search],
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await client.get('/api/tournaments', { params: query });
        setTournaments(response.data?.data || []);
        setError('');
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load tournaments.');
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-32">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">Find your next match</p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold">Tournament hub</h1>
            <p className="mt-2 text-zinc-400">Discover, join, and follow every Clutch event.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tournaments"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500 sm:w-64"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3"
            >
              <option value="">All status</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {loading ? <p className="py-16 text-zinc-400">Loading tournaments…</p> : null}
        {error ? <p className="py-16 text-red-300">{error}</p> : null}
        {!loading && !error && tournaments.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-zinc-700 p-12 text-center text-zinc-400">
            No tournaments match these filters yet.
          </div>
        ) : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <Link
              to={`/tournaments/${tournament.slug}`}
              key={tournament._id}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-red-600"
            >
              {tournament.bannerUrl ? (
                <img src={tournament.bannerUrl} alt="" className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-red-950 to-zinc-900 text-4xl font-black text-red-500">
                  CLUTCH
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[tournament.status]}`}
                  >
                    {tournament.status}
                  </span>
                  <span className="text-sm text-zinc-400">{tournament.game?.name}</span>
                </div>
                <h2 className="mt-4 text-xl font-bold">{tournament.title}</h2>
                <p className="mt-2 text-sm text-zinc-400">{new Date(tournament.startsAt).toLocaleString()}</p>
                <div className="mt-5 flex justify-between text-sm">
                  <span>{tournament.format.replace('-', ' ')}</span>
                  <span className="font-semibold text-red-400">
                    ₹{tournament.prizePool.toLocaleString()} prize pool
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
