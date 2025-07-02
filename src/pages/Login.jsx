import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add real login logic
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    alert(`Logged in as: ${form.email}`);
    setForm({ email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            required
          />
          {error && (
            <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-500 transition font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
