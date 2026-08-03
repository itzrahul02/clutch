import React, { useState } from "react";
import logo from "../assets/Clutch_logo.png";
import collegeLogo from "../assets/Logo.png";
import blackClutch from "../assets/RED_CLUTCH2.png";
import background from "../assets/background4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className="z-50 w-full border-b border-red-900/40 px-4 py-2 text-white font-medium shadow-md fixed top-0 left-0 right-0 md:px-6"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.72),rgba(0,0,0,.72)), url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Left Logo Section */}
          <div className="flex items-center gap-3">
            <Link to='/'>
            <img
              src={logo}
              alt="Clutch Logo"
              className="h-11 w-11 rounded-full border-2 border-red-800 md:h-14 md:w-14"
            />
            </Link>
            <img src={blackClutch} alt="Clutch" className="h-7 w-auto md:h-9" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-5 text-sm">
            <Link to="/" className="hover:text-red-600">Home</Link>
 
            <Link to="/tournaments" className="hover:text-red-600">Tournaments</Link>
            <Link to="/games" className="hover:text-red-600">Games</Link>
            <Link to="/leaderboard" className="hover:text-red-600">Leaderboard</Link>
            <Link to="/community" className="hover:text-red-600">Community</Link>
            {isAuthenticated ? <Link to="/dashboard" className="hover:text-red-600">Dashboard</Link> : null}
            {isAuthenticated && (user?.role === 'admin' || user?.role === 'coordinator') ? (
              <Link to="/organizer" className="hover:text-red-600">Organizer</Link>
            ) : null}
            {!isAuthenticated ? (
              <Link to="/login" className="hover:text-red-600">Login</Link>
            ) : (
              <button type="button" className="hover:text-red-600" onClick={handleLogout}>Logout</button>
            )}

          </div>

          <a href="https://iiitkota.ac.in/" target="_blank" rel="noreferrer" className="hidden xl:block"><img src={collegeLogo} alt="IIIT Kota" className="h-11 w-11 rounded-full border border-red-800" /></a>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full border-t border-white/10 bg-black/95 p-5 flex flex-col items-center gap-4">
            <a href="#" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Home</a>
            <Link to="/tournaments" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Tournaments</Link>
            <Link to="/games" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Games</Link>
            <Link to="/leaderboard" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
            <Link to="/community" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Community</Link>
            {isAuthenticated ? <Link to="/dashboard" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Dashboard</Link> : null}
            {isAuthenticated && (user?.role === 'admin' || user?.role === 'coordinator') ? (
              <Link to="/organizer" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Organizer</Link>
            ) : null}
            {!isAuthenticated ? (
              <Link to="/login" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Login</Link>
            ) : (
              <button type="button" className="hover:text-red-600" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>
            )}
          </div>
        )}
      </nav>

      {/* Social Icons (Fixed to Bottom) */}
      <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-3">
  {/* YouTube Button */}
  <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-red-600 p-3 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <a href="https://www.youtube.com/@Clutch-iiitk" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faYoutube} className="h-7 w-7 text-white" />
    </a>
  </div>

  {/* Instagram Button */}
  <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-3 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <a href="https://www.instagram.com/clutch_iiitkota/" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} className="h-7 w-7 text-white" />
    </a>
  </div>
</div>

    </div>
  );
}

export default Nav;
