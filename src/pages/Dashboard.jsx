import React, { useState } from "react";
import { CalendarDaysIcon, StarIcon, UserCircleIcon, SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";

const user = {
  name: "Alex",
  skinTone: "Medium",
  skinColor: "#e0ac69",
  xp: 320,
  level: 4,
  badges: ["Planner", "Palette Pro", "Privacy Champion"]
};

const outfits = [
  {
    date: "2025-07-03",
    img: "/outfits/outfit1.jpg",
    rating: 9,
    palette: ["#e57373", "#f06292", "#ba68c8"],
    favorite: true,
    aiNote: "Pastel pinks highlight your skin tone beautifully!"
  },
  // ...more outfits
];

const palettes = [
  { colors: ["#e57373", "#f06292", "#ba68c8"], name: "Summer Blush" },
  { colors: ["#ffd54f", "#ffb300", "#ffa726"], name: "Golden Hour" },
  // ...more palettes
];

export default function Dashboard() {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] py-10 px-4 md:px-12">
      {/* Profile & Gamification */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <div className="flex items-center gap-4">
          <UserCircleIcon className="w-20 h-20 text-pink-400" />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold">Skin Tone:</span>
              <span className="inline-block w-6 h-6 rounded-full border" style={{ background: user.skinColor }}></span>
              <span className="text-sm">{user.skinTone}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="font-semibold text-lg">Level {user.level}</span>
              <span className="text-xs text-gray-500">({user.xp} XP)</span>
            </div>
            <div className="flex gap-2 mt-1">
              {user.badges.map((badge) => (
                <span key={badge} className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-semibold">{badge}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="flex-1 w-full max-w-md">
          <div className="text-sm font-semibold mb-1">Style Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-pink-400 h-4 rounded-full transition-all" style={{ width: "64%" }}></div>
          </div>
        </div>
      </div>

      {/* Calendar & Outfit Planner */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDaysIcon className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">Outfit Planner</span>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col gap-2">
            <span className="text-sm text-gray-700">Plan your looks for the week! (Calendar widget here)</span>
            {/* Placeholder for calendar */}
            <div className="h-24 bg-white rounded shadow-inner flex items-center justify-center text-gray-400 text-sm">[Calendar Component]</div>
            <span className="text-xs text-blue-500 mt-2">🔥 Streak: 5 days planned in a row!</span>
          </div>
        </div>
        {/* Favorite Palettes */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <span className="font-bold text-lg">Favorite Color Palettes</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {palettes.map((p) => (
              <div key={p.name} className="flex flex-col items-center">
                <div className="flex gap-1 mb-1">
                  {p.colors.map((c) => (
                    <span key={c} className="w-6 h-6 rounded-full" style={{ background: c }}></span>
                  ))}
                </div>
                <span className="text-xs text-gray-600">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outfit History & Journal */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <StarIcon className="w-5 h-5 text-pink-400" />
          <span className="font-bold text-lg">Your Outfits & Style Journal</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {outfits.map((o, idx) => (
            <div key={idx} className="bg-pink-50 rounded-lg p-4 flex gap-4 items-center shadow hover:shadow-lg transition">
              <img src={o.img} alt="Outfit" className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-pink-600">{o.rating}/10</span>
                  {o.favorite && <StarIcon className="w-5 h-5 text-yellow-400" />}
                </div>
                <div className="flex gap-1 my-1">
                  {o.palette.map((c) => (
                    <span key={c} className="w-4 h-4 rounded-full" style={{ background: c }}></span>
                  ))}
                </div>
                <span className="text-xs text-gray-600">{o.aiNote}</span>
              </div>
              <button className="text-xs text-gray-400 hover:text-pink-500" title="Delete">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Suggestions & Actions */}
      <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="font-bold mb-2">Personal Suggestions</div>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            <li>Try a monochrome look with your favorite palette this week!</li>
            <li>Complete the “7-Day Style Challenge” for bonus XP.</li>
            <li>Reflect on your style journey in your private journal.</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <button className="bg-pink-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-500 transition">
            Export My Data
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-red-400 hover:text-white transition"
            onClick={() => setShowDelete(true)}
          >
            Delete My Data
          </button>
          {showDelete && (
            <div className="mt-2 text-red-500 text-sm font-semibold">
              Are you sure? This action is permanent.
              <button
                className="ml-2 underline"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
