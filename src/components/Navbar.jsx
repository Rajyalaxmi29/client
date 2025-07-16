import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCamera, FaPalette, FaCalendarAlt, FaTshirt, FaLock } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1A1A2E] bg-opacity-90 backdrop-filter backdrop-blur-lg fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="logo text-2xl font-bold text-white"
          onClick={() => setMenuOpen(false)}
        >
          Style<span className="bg-gradient-to-r from-[#FF4D89] to-[#FF9E80] bg-clip-text text-transparent">Sense</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `text-white hover:text-[#FF4D89] transition-colors duration-300 font-medium
              ${isActive ? 'text-[#FF4D89]' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) => 
              `text-white hover:text-[#FF4D89] transition-colors duration-300 font-medium
              ${isActive ? 'text-[#FF4D89]' : ''}`
            }
          >
            <div className="flex items-center">
              <FaCamera className="mr-2" /> Style Analysis
            </div>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => 
              `text-white hover:text-[#FF4D89] transition-colors duration-300 font-medium
              ${isActive ? 'text-[#FF4D89]' : ''}`
            }
          >
            <div className="flex items-center">
              <FaTshirt className="mr-2" /> My Wardrobe
            </div>
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) => 
              `text-white hover:text-[#FF4D89] transition-colors duration-300 font-medium
              ${isActive ? 'text-[#FF4D89]' : ''}`
            }
          >
            Community
          </NavLink>
          
          {/* CTA Button */}
          <NavLink
            to="/upload"
            className="bg-gradient-to-r from-[#FF4D89] to-[#FF9E80] text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
          >
            Try It Now
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D89]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1A2E] bg-opacity-95 px-6 pt-2 pb-6 space-y-3 animate-fade-in-down">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => 
              `block px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive ? 'text-[#FF4D89] bg-[#1A1A2E]' : 'text-white hover:bg-[#1A1A2E]/80'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/upload"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => 
              `block px-4 py-3 rounded-lg font-medium transition-colors flex items-center
              ${isActive ? 'text-[#FF4D89] bg-[#1A1A2E]' : 'text-white hover:bg-[#1A1A2E]/80'}`
            }
          >
            <FaCamera className="mr-2" /> Style Analysis
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => 
              `block px-4 py-3 rounded-lg font-medium transition-colors flex items-center
              ${isActive ? 'text-[#FF4D89] bg-[#1A1A2E]' : 'text-white hover:bg-[#1A1A2E]/80'}`
            }
          >
            <FaTshirt className="mr-2" /> My Wardrobe
          </NavLink>
          <NavLink
            to="/community"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => 
              `block px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive ? 'text-[#FF4D89] bg-[#1A1A2E]' : 'text-white hover:bg-[#1A1A2E]/80'}`
            }
          >
            Community
          </NavLink>
          
          {/* Mobile CTA Button */}
          <NavLink
            to="/upload"
            onClick={() => setMenuOpen(false)}
            className="w-full mt-4 bg-gradient-to-r from-[#FF4D89] to-[#FF9E80] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 text-center block"
          >
            Try It Now
          </NavLink>
        </div>
      )}
    </nav>
  );
}