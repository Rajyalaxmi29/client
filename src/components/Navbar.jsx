import React from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const navLinkClass =
    "px-3 py-1 rounded transition font-medium text-sm";
  const baseColor =
    "text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-gray-800 hover:text-pink-500";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-10 transition">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-pink-500 tracking-wide"
        >
          StyleSense
        </NavLink>
        <div className="flex items-center space-x-1 md:space-x-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkClass} ${baseColor} ${
                isActive ? "bg-pink-100 dark:bg-gray-800 text-pink-500" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `${navLinkClass} ${baseColor} ${
                isActive ? "bg-pink-100 dark:bg-gray-800 text-pink-500" : ""
              }`
            }
          >
            Upload
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navLinkClass} ${baseColor} ${
                isActive ? "bg-pink-100 dark:bg-gray-800 text-pink-500" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${navLinkClass} ${baseColor} ${
                isActive ? "bg-pink-100 dark:bg-gray-800 text-pink-500" : ""
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${navLinkClass} ${baseColor} ${
                isActive ? "bg-pink-100 dark:bg-gray-800 text-pink-500" : ""
              }`
            }
          >
            Register
          </NavLink>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
