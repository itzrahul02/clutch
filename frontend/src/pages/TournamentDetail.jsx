import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import client from '../api/client';
import Nav from '../components/nav';

export default function TournamentDetail() {
  const { slug } = useParams();
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { client.get(`/api/tournaments/${slug}`).then((response) => setTournament(response.data?.data)).catch((requestError) => setError(requestError.response?.data?.message || 'Tournament not found.')); }, [slug]);
  if (error) return <div className="min-h-screen bg-zinc-950 text-white"><Nav /><p className="mx-auto max-w-5xl px-6 pt-32 text-red-300">{error}</p></div>;
  if (!tournament) return <div className="min-h-screen bg-zinc-950 text-white"><Nav /><p className="mx-auto max-w-5xl px-6 pt-32 text-zinc-400">Loading tournament…</p></div>;

  return <div className="min-h-screen bg-zinc-950 text-white"><Nav /><main className="mx-auto max-w-5xl px-6 pb-16 pt-32"><Link to="/tournaments" className="text-sm text-red-400">← All tournaments</Link><section className="mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">{tournament.bannerUrl ? <img src={tournament.bannerUrl} alt="" className="h-64 w-full object-cover" /> : null}<div className="p-8"><span className="rounded-full bg-red-500/20 px-3 py-1 text-sm capitalize text-red-300">{tournament.status}</span><h1 className="mt-4 text-4xl font-bold">{tournament.title}</h1><p className="mt-4 max-w-3xl whitespace-pre-line text-zinc-300">{tournament.description}</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat label="Game" value={tournament.game?.name} /><Stat label="Starts" value={new Date(tournament.startsAt).toLocaleDateString()} /><Stat label="Prize pool" value={`₹${tournament.prizePool.toLocaleString()}`} /><Stat label="Entry fee" value={tournament.entryFee ? `₹${tournament.entryFee}` : 'Free'} /></div></div></section><section className="mt-8 grid gap-8 md:grid-cols-2"><div><h2 className="text-2xl font-bold">Rules</h2><ul className="mt-4 space-y-3 text-zinc-300">{tournament.rules.length ? tournament.rules.map((rule, index) => <li key={index} className="rounded-lg bg-zinc-900 p-4">{index + 1}. {rule}</li>) : <li>No rules have been published yet.</li>}</ul></div><div className="rounded-xl border border-red-900 bg-red-950/30 p-6"><h2 className="text-xl font-bold">Registration</h2><p className="mt-3 text-zinc-300">Registration closes {new Date(tournament.registrationClosesAt).toLocaleString()}. Maximum {tournament.maxTeams} teams.</p><Link to="/form" className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-500">Register your team</Link><Link to={`/tournaments/${tournament.slug}/matches`} className="ml-3 mt-6 inline-block rounded-lg border border-red-500 px-5 py-3 font-semibold hover:bg-red-500/10">Bracket & matches</Link></div></section></main></div>;
}

function Stat({ label, value }) { return <div className="rounded-lg bg-zinc-950 p-4"><p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p><p className="mt-1 font-semibold">{value}</p></div>; }
