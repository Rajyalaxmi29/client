import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCamera, FaPalette, FaTshirt, FaUsers, 
  FaSearch, FaUserCircle, FaBars, FaTimes 
} from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/skin-tone-analysis", name: "Skin Analysis", icon: <FaPalette /> },
    { path: "/virtual-tryon", name: "Virtual Try-On", icon: <FaTshirt /> },
    { path: "/community", name: "Community", icon: <FaUsers /> }
  ];

  return (
    <nav className="bg-[#1A1A2E]/90 backdrop-blur-md fixed w-full z-50 border-b border-[#2A2A3E]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Brand Logo with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavLink
            to="/"
            className="logo text-2xl font-bold text-white flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <span className="bg-gradient-to-r from-[#FF4D89] to-[#FF9E80] bg-clip-text text-transparent">
              StyleSense
            </span>
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white p-2 rounded-full hover:bg-[#2A2A3E] transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <FaSearch />
          </motion.button>

          {/* Search Input */}
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search styles..."
                className="bg-[#2A2A3E] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF4D89] w-64"
              />
            </motion.div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center text-[#E0E0E0] hover:text-white transition-colors
                    ${isActive ? 'text-white font-medium' : ''}`
                  }
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* User Profile / CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/profile"
              className="flex items-center space-x-2 bg-[#2A2A3E] hover:bg-[#3A3A4E] px-4 py-2 rounded-full transition-colors"
            >
              <FaUserCircle className="text-white" />
              <span className="text-white font-medium">My Style</span>
            </NavLink>
          </motion.div>
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

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#1A1A2E] bg-opacity-95 px-6 pt-2 pb-6 space-y-2"
        >
          {/* Mobile Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search styles..."
              className="w-full bg-[#2A2A3E] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D89]"
            />
            <FaSearch className="absolute right-4 top-3.5 text-[#E0E0E0]" />
          </div>

          {/* Mobile Navigation Links */}
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
                  ${isActive ? 'bg-[#FF4D89]/20 text-white' : 'text-[#E0E0E0] hover:bg-[#2A2A3E]'}`}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.name}
              </NavLink>
            </motion.div>
          ))}

          {/* Mobile Profile Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navItems.length * 0.1 }}
            className="mt-4"
          >
            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-4 py-3 rounded-lg bg-[#2A2A3E] text-white hover:bg-[#3A3A4E] transition-colors"
            >
              <FaUserCircle className="mr-3" />
              My Style Profile
            </NavLink>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
}