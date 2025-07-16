import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SparklesIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/upload", label: "Upload" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <nav className="bg-[#0A2463] shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        {/* Brand + Sparkle */}
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-[#FFD700] animate-pulse" />
          <NavLink
            to="/"
            className="text-2xl font-extrabold tracking-wide text-white hover:text-[#FFD700] transition-colors"
            style={{ letterSpacing: '0.05em' }}
            onClick={() => setMenuOpen(false)}
          >
            StyleSense
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "relative px-4 py-2 rounded-lg font-medium text-base",
                  "transition-all duration-200 focus:outline-none",
                  "text-white hover:text-[#FFD700] hover:bg-[#0A2463]/90",
                  isActive ? "text-[#FFD700] font-semibold bg-[#0A2463]/80" : "",
                ].join(" ")
              }
            >
              <span className="relative group">
                {label}
                <span
                  className={`
                    absolute left-0 right-0 -bottom-1 h-0.5 rounded-full
                    bg-[#FFD700] transition-all duration-300
                    ${window.location.pathname === to ? "opacity-100 scale-x-100" : "opacity-0 group-hover:opacity-100 group-hover:scale-x-75"}
                  `}
                  aria-hidden="true"
                />
              </span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Fixed isActive usage */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A2463] shadow-lg px-6 pt-2 pb-4 flex flex-col gap-1 animate-fade-in-down">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive: active }) =>  // Correctly parameterized
                [
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  "text-white hover:bg-[#0A2463]/90",
                  active ? "text-[#FFD700] font-semibold bg-[#0A2463]/80" : "",
                ].join(" ")
              }
            >
              {({ isActive }) => (  // Proper render prop pattern
                <div className="flex items-center gap-2">
                  {isActive && (
                    <SparklesIcon className="w-4 h-4 text-[#FFD700]" />
                  )}
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}