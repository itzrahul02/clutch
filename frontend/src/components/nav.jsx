import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`z-50 w-full py-1 md:py-2 px-6 text-white font-medium fixed top-0 left-0 right-0 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-red-900/20 backdrop-blur-md bg-black/80' : 'shadow-md'
        }`}
        style={!scrolled ? {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        } : {}}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Left Logo Section */}
          <div className="flex items-center gap-4">
            <Link to='/'>
            <img
              src={logo}
              alt="Clutch Logo"
              className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full border-3 border-red-800 hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            />
            </Link>
            
            <img src={blackClutch} alt="Black Clutch" className="h-[1.5rem] md:h-[3rem]" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg">
            <a href="#" className="relative hover:text-red-500 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full">Home</a>
 
            <a href="#games" className="relative hover:text-red-500 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full">Register</a>
            {isAuthenticated && (user?.role === 'admin' || user?.role === 'coordinator') ? (
              <Link to="/admin/games" className="relative hover:text-red-500 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full">Admin</Link>
            ) : null}
            {!isAuthenticated ? (
              <Link to="/login" className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">Login</Link>
            ) : (
              <button type="button" className="bg-zinc-800 hover:bg-red-600 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300" onClick={handleLogout}>Logout</button>
            )}

          </div>

          {/* Right College Logo */}
          <div className="hidden md:block">
            <a href="https://iiitkota.ac.in/" target="_blank">
              <img src={collegeLogo} alt="IIIT Kota" className="h-[50px] md:h-[70px] rounded-full border border-red-800 hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-zinc-800 flex flex-col items-center gap-5 overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[400px] py-6' : 'max-h-0 py-0'}`}>
            <a href="#" className="text-lg hover:text-red-500 transition-colors" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#games" className="text-lg hover:text-red-500 transition-colors" onClick={() => setMenuOpen(false)}>Register</a>
            {isAuthenticated && (user?.role === 'admin' || user?.role === 'coordinator') ? (
              <Link to="/admin/games" className="text-lg hover:text-red-500 transition-colors" onClick={() => setMenuOpen(false)}>Admin</Link>
            ) : null}
            {!isAuthenticated ? (
              <Link to="/login" className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-full font-semibold transition-all" onClick={() => setMenuOpen(false)}>Login</Link>
            ) : (
              <button type="button" className="bg-zinc-800 hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-all" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>
            )}
        </div>
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
