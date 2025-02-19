import React, { useState } from "react";
import logo from "../assets/Clutch_logo.png";
import collegeLogo from "../assets/Logo.png";
import blackClutch from "../assets/RED_CLUTCH2.png";
import background from "../assets/background4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav
        className="z-50 w-full py-1 md:py-2 px-6 text-white font-medium shadow-md fixed top-0 left-0 right-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Left Logo Section */}
          <div className="flex items-center gap-4">
            <Link to='/'>
            <img
              src={logo}
              alt="Clutch Logo"
              className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]  rounded-full border-4 border-red-800"
            />
            </Link>
            
            <img src={blackClutch} alt="Black Clutch" className="h-[1.5rem] md:h-[3.5rem]" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-lg">
            <a href="#" className="hover:text-red-600">Home</a>
 
            <a href="#games" className="hover:text-red-600">Register</a>

          </div>

          {/* Right College Logo */}
          <div className="hidden md:block">
            <a href="https://iiitkota.ac.in/" target="_blank">
              <img src={collegeLogo} alt="IIIT Kota" className="h-[60px] md:h-[80px] rounded-full border border-red-800" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-90 p-5 flex flex-col items-center gap-4">
            <a href="#" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#games" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Games</a>
            <a href="#" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Events</a>
          </div>
        )}
      </nav>

      {/* Social Icons (Fixed to Bottom) */}
      <div className="fixed z-50 bottom-6 left-4 flex flex-col gap-3">
        <div className="p-3 border bg-red-600 rounded-full shadow-lg">
          <a href="https://www.youtube.com/@Clutch-iiitk" target="_blank">
            <FontAwesomeIcon icon={faYoutube} className="size-7 text-white" />
          </a>
        </div>
        <div className="p-3 border rounded-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-lg">
          <a href="https://www.instagram.com/clutch_iiitkota/" target="_blank">
            <FontAwesomeIcon icon={faInstagram} className="size-7 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
