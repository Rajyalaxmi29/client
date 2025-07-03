import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
     console.log(form);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`Welcome, ${data.user.name}!`);
      setForm({ email: "", password: "" });
      setError("");
      navigate("/"); // Redirects to home page after login
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8e1f4] via-[#e0e7fa] to-[#fdf6f0] px-2">
      <div className="w-full max-w-sm rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md p-8 md:p-10 flex flex-col items-center animate-fade-in">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-[#FF78AC]">Login</h2>
        <form onSubmit={handleSubmit} className="w-full" autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 bg-[#f2f0ea] focus:outline-none focus:ring-2 focus:ring-[#FF78AC] text-gray-900"
            required
            autoComplete="username"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 bg-[#f2f0ea] focus:outline-none focus:ring-2 focus:ring-[#FF78AC] text-gray-900 pr-10"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-[#FF78AC]"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {error && (
            <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF78AC] to-[#6C63FF] text-white py-2 rounded-full hover:from-pink-500 hover:to-blue-500 transition font-semibold shadow-lg mt-2"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#6C63FF] hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
