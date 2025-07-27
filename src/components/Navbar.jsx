import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCamera,
  FaPalette,
  FaTshirt,
  FaUsers,
  FaUserCircle,
  FaFire,
  FaLock
} from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/skin-analyzer", name: "Skin Analysis", icon: <FaPalette /> },
    { path: "/virtual-tryon", name: "Virtual Try-On", icon: <FaCamera /> },
    { path: "/smart-wardrobe", name: "Smart Wardrobe", icon: <FaLock /> },
     { path: "/community", name: "Community", icon: <FaUsers /> },
  { path: "/my-style", name: "My Style", icon: <FaUserCircle /> }
  ];

  // Close navbar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative">
      {/* Trending Button */}
      <button
        onClick={() => setMenuOpen(prev => !prev)}
        className="text-white p-2 fixed top-4 left-4 z-50 bg-[#FF4D89] rounded-full shadow-lg"
        aria-label="Toggle navbar"
      >
        <FaFire size={20} />
      </button>

      {/* Navbar Menu */}
      {menuOpen && (
        <motion.nav
          ref={navRef}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-14 left-4 bg-[#1A1A2E] p-4 rounded-lg shadow-lg z-40"
        >
          {/* Brand */}
          <div className="text-white font-bold text-lg mb-4">ruva</div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                   ${isActive ? 'bg-[#FF4D89]/20 text-white' : 'text-[#E0E0E0] hover:bg-[#2A2A3E]'}`
                }
              >
                {item.icon && item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </motion.nav>
      )}
    </div>
  );
}