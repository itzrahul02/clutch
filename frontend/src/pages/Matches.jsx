import React from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/nav';
import SiteFooter from '../components/SiteFooter';
import { useEffect, useState } from 'react';
import client from '../api/client';

export default function Matches() {
  const { slug } = useParams(); const [matches, setMatches] = useState([]);
  useEffect(() => { client.get('/api/platform/matches').then((r) => setMatches(r.data?.data || [])).catch(() => setMatches([])); }, []);
  const visible = slug ? matches.filter((match) => match.tournament?.slug === slug) : matches;
  return <div className="min-h-screen bg-zinc-950 text-white"><Nav /><main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32"><p className="section-kicker">Match centre</p><h1 className="section-title">Brackets and matches.</h1><p className="mt-4 text-sm text-zinc-400 sm:hidden">Swipe horizontally to view a full tournament bracket.</p><div className="mt-10 overflow-x-auto pb-3"><div className="min-w-[700px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6"><div className="mb-6 grid grid-cols-3 gap-6 text-xs font-bold uppercase tracking-wider text-zinc-500"><span>Round 1</span><span>Semifinals</span><span>Final</span></div>{visible.length ? <div className="space-y-4">{visible.map((match) => <div key={match._id} className="grid grid-cols-[1fr_auto_1fr] items-center rounded-lg bg-zinc-950 p-4"><span>{match.teamA?.name || 'TBD'}</span><b className="rounded bg-red-500/15 px-3 py-1 text-red-300">{match.scoreA} : {match.scoreB}</b><span className="text-right">{match.teamB?.name || 'TBD'}</span><small className="col-span-3 mt-2 text-center text-zinc-500">Round {match.round} · {match.status}</small></div>)}</div> : <div className="rounded-lg border border-dashed border-zinc-700 p-8 text-center text-zinc-400 sm:p-12">No bracket has been published yet. Once organizers schedule matches, every round will appear here.</div>}</div></div></main><SiteFooter /></div>;
}
