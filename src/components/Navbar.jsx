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

  const navLinkClass =
    "relative px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 focus:outline-none";
  const baseColor =
    "text-gray-700 hover:text-[#6C63FF]";

  return (
    <nav className="bg-gradient-to-r from-[#e0e7fa] via-[#f2f0ea] to-[#ff78ac] shadow-lg rounded-b-2xl sticky top-0 z-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Brand + Sparkle */}
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-7 h-7 text-[#FF78AC] drop-shadow animate-bounce" />
          <NavLink
            to="/"
            className="text-2xl font-extrabold tracking-wide text-[#6C63FF] drop-shadow-lg hover:scale-105 transition-transform"
            style={{ letterSpacing: '0.05em' }}
            onClick={() => setMenuOpen(false)}
          >
            StyleSense
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  navLinkClass,
                  baseColor,
                  "hover:bg-[#e0e7fa]/70",
                  "hover:scale-105 hover:shadow-md",
                  isActive
                    ? "text-[#FF78AC] bg-[#e0e7fa] font-bold"
                    : "",
                ].join(" ")
              }
            >
              <span className="relative group">
                {label}
                {/* Animated underline */}
                <span
                  className={`
                    absolute left-0 right-0 -bottom-1 h-0.5 rounded-full
                    bg-[#6C63FF] transition-all duration-300
                    ${window.location.pathname === to ? "opacity-100 scale-x-100" : "opacity-0 group-hover:opacity-100 group-hover:scale-x-100"}
                  `}
                  aria-hidden="true"
                />
              </span>
            </NavLink>
          ))}
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <XMarkIcon className="h-7 w-7 text-[#6C63FF]" />
          ) : (
            <Bars3Icon className="h-7 w-7 text-[#6C63FF]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 shadow-lg rounded-b-2xl px-6 pt-2 pb-4 flex flex-col gap-2 animate-fade-in-down">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  navLinkClass,
                  baseColor,
                  "hover:bg-[#e0e7fa]/70",
                  isActive
                    ? "text-[#FF78AC] bg-[#e0e7fa] font-bold"
                    : "",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
