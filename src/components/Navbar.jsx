import React from 'react';
import { NavLink } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const navLinkClass =
    "relative px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 focus:outline-none";
  const baseColor =
    "text-gray-700 dark:text-gray-100 hover:text-[#6C63FF] dark:hover:text-[#FF78AC]";

  return (
    <nav className="bg-gradient-to-r from-[#e0e7fa] via-[#f2f0ea] to-[#ff78ac] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg rounded-b-2xl sticky top-0 z-20 transition-all duration-300">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center py-3 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-7 h-7 text-[#FF78AC] drop-shadow animate-bounce" />
          <NavLink
            to="/"
            className="text-2xl font-extrabold tracking-wide text-[#6C63FF] dark:text-[#FF78AC] drop-shadow-lg hover:scale-105 transition-transform"
            style={{ letterSpacing: '0.05em' }}
          >
            StyleSense
          </NavLink>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-3 sm:mt-0">
          {[
            { to: "/", label: "Home" },
            { to: "/upload", label: "Upload" },
            { to: "/dashboard", label: "Dashboard" },
            { to: "/login", label: "Login" },
            { to: "/register", label: "Register" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  navLinkClass,
                  baseColor,
                  "hover:bg-[#e0e7fa]/70 dark:hover:bg-gray-800/70",
                  "hover:scale-105 hover:shadow-md",
                  isActive
                    ? "text-[#FF78AC] bg-[#e0e7fa] dark:bg-gray-800 font-bold"
                    : "",
                ].join(" ")
              }
            >
              <span className="relative group">
                {label}
                <span
                  className={`
                    absolute left-0 right-0 -bottom-1 h-0.5 rounded-full
                    bg-[#6C63FF] dark:bg-[#FF78AC] transition-all duration-300
                    ${window.location.pathname === to ? "opacity-100 scale-x-100" : "opacity-0 group-hover:opacity-100 group-hover:scale-x-100"}
                  `}
                  aria-hidden="true"
                />
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
