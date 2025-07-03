import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    alert(
      `Registered!\nName: ${form.name}\nAge: ${form.age}\nEmail: ${form.email}`
    );
    setForm({ name: "", age: "", email: "", password: "", confirmPassword: "" });
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8e1f4] via-[#e0e7fa] to-[#fdf6f0] px-2">
      <div className="w-full max-w-sm rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md p-8 md:p-10 flex flex-col items-center animate-fade-in">
        {/* Optional: Add an icon or illustration here */}
        <h2 className="text-2xl font-extrabold mb-6 text-center text-[#6C63FF]">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="w-full" autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 bg-[#f2f0ea] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] text-gray-900"
            required
            autoComplete="name"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            min="13"
            max="120"
            className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 bg-[#f2f0ea] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] text-gray-900"
            required
            autoComplete="off"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 bg-[#f2f0ea] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] text-gray-900"
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
              className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 bg-[#f2f0ea] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] text-gray-900 pr-10"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-[#6C63FF]"
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
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 bg-[#f2f0ea] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] text-gray-900"
            required
            autoComplete="new-password"
          />
          {error && (
            <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6C63FF] to-[#FF78AC] text-white py-2 rounded-full hover:from-blue-500 hover:to-pink-500 transition font-semibold shadow-lg mt-2"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF78AC] hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
