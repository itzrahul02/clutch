import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Clutch_logo.png';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12 text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Clutch" className="h-10 w-10 rounded-full border border-red-700" />
            <span className="text-xl font-black tracking-wide text-white">CLUTCH</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6">
            The competitive gaming hub for the IIIT Kota community.
          </p>
        </div>
        <div className="flex gap-10 text-sm">
          <div>
            <p className="font-bold text-white">Explore</p>
            <Link to="/tournaments" className="mt-3 block hover:text-red-400">
              Tournaments
            </Link>
            <Link to="/form" className="mt-2 block hover:text-red-400">
              Team registration
            </Link>
          </div>
          <div>
            <p className="font-bold text-white">Platform</p>
            <Link to="/login" className="mt-3 block hover:text-red-400">
              Sign in
            </Link>
            <Link to="/register" className="mt-2 block hover:text-red-400">
              Create account
            </Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs">
        © {new Date().getFullYear()} Clutch, IIIT Kota. Built for competition.
      </p>
    </footer>
  );
}
