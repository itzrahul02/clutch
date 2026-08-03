import React, { useState } from 'react';
import Nav from '../components/nav';
import client from '../api/client';

export default function CoordinatorRequest() {
  const [note, setNote] = useState(''); const [message, setMessage] = useState('');
  const submit = async (event) => { event.preventDefault(); try { await client.post('/api/platform/role-requests', { note }); setMessage('Your request has been sent to the organizer team.'); } catch (error) { setMessage(error.response?.data?.message || 'Could not send request.'); } };
  return <div className="min-h-screen bg-zinc-950 text-white"><Nav /><main className="mx-auto max-w-xl px-6 pt-32"><p className="section-kicker">Become a coordinator</p><h1 className="section-title">Help run Clutch events.</h1><form onSubmit={submit} className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6"><p className="text-sm leading-6 text-zinc-400">Your request will be reviewed by an admin or coordinator. Tell them why you want to help.</p><textarea value={note} onChange={(event) => setNote(event.target.value)} className="mt-5 min-h-32 w-full rounded-lg bg-zinc-950 p-3 outline-none" placeholder="Your experience or reason for applying (optional)" /><button className="mt-4 rounded bg-red-600 px-5 py-3 font-bold">Send coordinator request</button>{message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}</form></main></div>;
}
