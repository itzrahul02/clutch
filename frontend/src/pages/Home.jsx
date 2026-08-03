import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarDays, faShieldHalved, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import Nav from '../components/nav';
import { Register } from './Registration';
import SiteFooter from '../components/SiteFooter';
import wallpaper from '../assets/wp3.jpg';
import valorant from '../assets/vloo.png';
import bgmi from '../assets/bgmi2.jpg';
import fifa from '../assets/fifa1.jpg';
import './Home.css';

const highlights = [
  { icon: faTrophy, value: '06+', label: 'competitive titles' },
  { icon: faUsers, value: '100+', label: 'players supported' },
  { icon: faCalendarDays, value: '24/7', label: 'event discovery' },
];

const gameCards = [
  { name: 'Valorant', image: valorant, tone: 'from-red-950/80 to-black' },
  { name: 'BGMI', image: bgmi, tone: 'from-emerald-950/80 to-black' },
  { name: 'FIFA', image: fifa, tone: 'from-blue-950/80 to-black' },
];

export default function Home() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch('/api/tournaments?status=upcoming')
      .then((response) => response.ok ? response.json() : { data: [] })
      .then((payload) => setTournaments((payload.data || []).slice(0, 3)))
      .catch(() => setTournaments([]));
  }, []);

  return <div className="min-h-screen overflow-hidden bg-[#070707] text-white">
    <Nav />
    <main>
      <section className="relative isolate min-h-[760px] overflow-hidden px-6 pb-20 pt-32 md:px-10">
        <img src={wallpaper} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_25%,rgba(220,38,38,.28),transparent_25%),linear-gradient(90deg,rgba(7,7,7,.98),rgba(7,7,7,.68),rgba(7,7,7,.9))]" />
        <div className="hero-grid absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[.22em] text-red-300"><span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" /> IIIT Kota esports platform</p>
            <h1 className="mt-8 text-5xl font-black leading-[.92] tracking-tight sm:text-7xl">PLAY HARD.<br /><span className="text-red-500">CLUTCH</span> HARDER.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-300">Clutch is your home for competitive campus gaming—discover tournaments, build a squad, and play for the top spot.</p>
            <div className="mt-9 flex flex-wrap gap-4"><Link to="/tournaments" className="rounded-lg bg-red-600 px-6 py-3.5 font-bold transition hover:bg-red-500">Explore tournaments <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></Link><a href="#games" className="rounded-lg border border-zinc-600 bg-black/30 px-6 py-3.5 font-bold transition hover:border-white">Register a team</a></div>
            <div className="mt-14 grid max-w-2xl grid-cols-3 border-y border-white/10 py-6">{highlights.map(({ icon, value, label }) => <div key={label} className="border-r border-white/10 px-3 last:border-0 sm:px-6"><FontAwesomeIcon icon={icon} className="text-red-400" /><p className="mt-2 text-2xl font-black">{value}</p><p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{label}</p></div>)}</div>
          </div>
          <aside className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/75 p-6 shadow-2xl backdrop-blur-xl"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-400">Live platform</p><span className="rounded bg-red-500/15 px-2 py-1 text-xs font-bold text-red-300">SEASON 01</span></div><div className="mt-6 rounded-xl border border-zinc-800 bg-black p-5"><p className="text-sm text-zinc-400">One place to</p><p className="mt-1 text-2xl font-bold">Compete. Connect. Conquer.</p><div className="mt-5 h-1 rounded bg-zinc-800"><div className="h-full w-3/4 rounded bg-red-500" /></div><p className="mt-3 text-xs text-zinc-500">Tournament operations, team registration, and player verification.</p></div><div className="mt-5 flex gap-3 rounded-xl bg-white/[.04] p-4 text-sm text-zinc-300"><FontAwesomeIcon icon={faShieldHalved} className="mt-1 text-red-400" /><p>Protected organizer tools keep every event fair and organized.</p></div></aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-kicker">The arena</p><h2 className="section-title">Built for every kind of competitor.</h2></div><Link to="/tournaments" className="text-sm font-bold text-red-400 hover:text-red-300">View all tournaments <FontAwesomeIcon icon={faArrowRight} className="ml-1" /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{gameCards.map((game) => <div key={game.name} className="group relative h-72 overflow-hidden rounded-2xl border border-zinc-800"><img src={game.image} alt={game.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className={`absolute inset-0 bg-gradient-to-t ${game.tone}`} /><div className="absolute inset-x-0 bottom-0 p-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-300">Ready to compete</p><h3 className="mt-2 text-3xl font-black">{game.name}</h3></div></div>)}</div></section>

      <section className="border-y border-white/10 bg-zinc-900/40"><div className="mx-auto max-w-7xl px-6 py-24"><p className="section-kicker">Upcoming events</p><h2 className="section-title">Your next game starts here.</h2>{tournaments.length ? <div className="mt-10 grid gap-5 md:grid-cols-3">{tournaments.map((event) => <Link to={`/tournaments/${event.slug}`} key={event._id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-red-500"><p className="text-sm text-red-400">{event.game?.name || 'Clutch event'}</p><h3 className="mt-3 text-xl font-bold">{event.title}</h3><p className="mt-3 text-sm text-zinc-400">{new Date(event.startsAt).toLocaleString()}</p><p className="mt-6 text-sm font-bold">View event <FontAwesomeIcon icon={faArrowRight} className="ml-1" /></p></Link>)}</div> : <div className="mt-10 rounded-xl border border-dashed border-zinc-700 bg-zinc-950/70 p-10 text-center"><p className="text-lg font-bold">New tournaments are landing soon.</p><p className="mt-2 text-zinc-400">Check the tournament hub for the latest announcements.</p><Link to="/tournaments" className="mt-5 inline-block text-red-400">Open tournament hub →</Link></div>}</div></section>
      <Register />
    </main>
    <SiteFooter />
  </div>;
}
