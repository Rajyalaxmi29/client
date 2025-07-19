import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCamera, FaPalette, FaTshirt, FaUsers, 
  FaUserCircle, FaBars, FaTimes 
} from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/skin-tone-analysis", name: "Skin Analysis", icon: <FaPalette /> },
    { path: "/virtual-tryon", name: "Virtual Try-On", icon: <FaTshirt /> },
    { path: "/community", name: "Community", icon: <FaUsers /> },
    { path: "/profile", name: "My Style", icon: <FaUserCircle /> }
  ];

  return (
    <nav className="bg-[#1A1A2E] fixed w-full z-50 border-b border-[#2A2A3E]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="logo text-2xl font-bold text-white"
          onClick={() => setMenuOpen(false)}
        >
          <span className="bg-gradient-to-r from-[#FF4D89] to-[#FF9E80] bg-clip-text text-transparent">
            StyleSense
          </span>
        </NavLink>

        {/* Desktop Navigation - SIMPLIFIED */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center text-[#E0E0E0] hover:text-white transition-colors text-sm
                  ${isActive ? 'text-white font-medium' : ''}`
                }
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu - SIMPLIFIED */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#1A1A2E] px-6 pt-2 pb-6 space-y-2"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg mb-1 transition-colors
                  ${isActive ? 'bg-[#FF4D89]/20 text-white' : 'text-[#E0E0E0] hover:bg-[#2A2A3E]'}`
                }
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
      )}
    </nav>
  );
}