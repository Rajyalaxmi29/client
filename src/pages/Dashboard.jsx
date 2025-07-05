import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  StarIcon,
  UserCircleIcon,
  SparklesIcon,
  TrashIcon,
  TrophyIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [suggestions] = useState([
    "Try a monochrome look with your favorite palette this week!",
    "Complete the '7-Day Style Challenge' for bonus XP.",
    "Reflect on your style journey in your private journal.",
  ]);
  const [palettes, setPalettes] = useState([]);

  // Fetch user profile & outfits after login
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // 1. Fetch user profile
      const userDoc = await getDoc(doc(db, "users", user.uid));
      setUserProfile(userDoc.exists() ? userDoc.data() : null);

      // 2. Fetch user's outfits
      const q = query(collection(db, "outfits"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const outfitList = [];
      const paletteSet = new Set();
      querySnapshot.forEach((doc) => {
        outfitList.push({ id: doc.id, ...doc.data() });
        // Collect palettes for display
        if (doc.data().suggestedPalette) {
          paletteSet.add(JSON.stringify(doc.data().suggestedPalette));
        }
      });
      setOutfits(outfitList.sort((a, b) => (b.date || "").localeCompare(a.date || "")));

      // 3. Extract unique palettes
      setPalettes(
        Array.from(paletteSet).map((p, i) => ({
          colors: JSON.parse(p),
          name: `Palette ${i + 1}`,
        }))
      );
    };

    fetchData();
  }, []);

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-gray-500">Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] py-8 px-2 md:px-8">
      {/* Profile & Gamification */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <div className="flex items-center gap-4">
          <UserCircleIcon className="w-20 h-20 text-pink-400 drop-shadow" />
          <div>
            <h2 className="text-2xl font-bold">{userProfile.name || "User"}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold">Skin Tone:</span>
              <span
                className="inline-block w-6 h-6 rounded-full border"
                style={{ background: userProfile.skinColor }}
              ></span>
              <span className="text-sm">{userProfile.skinTone}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="font-semibold text-lg">Level {userProfile.level || 1}</span>
              <span className="text-xs text-gray-500">({userProfile.xp || 0} XP)</span>
            </div>
            <div className="flex gap-2 mt-1">
              {(userProfile.badges || []).map((badge) => (
                <span
                  key={badge}
                  className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="flex-1 w-full max-w-md">
          <div className="text-sm font-semibold mb-1 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-blue-400" />
            Style Progress
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-pink-400 to-blue-400 h-4 rounded-full transition-all"
              style={{ width: `${Math.min(100, (userProfile.xp || 0) / 5)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Calendar & Outfit Planner */}
      <div className="bg-white/80 rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDaysIcon className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">Outfit Planner</span>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col gap-2">
            <span className="text-sm text-gray-700">
              Plan your looks for the week! (Calendar widget here)
            </span>
            {/* Placeholder for calendar */}
            <div className="h-24 bg-white rounded shadow-inner flex items-center justify-center text-gray-400 text-sm">
              [Calendar Component]
            </div>
            <span className="text-xs text-blue-500 mt-2">
              🔥 Streak: {userProfile.streak || 0} days planned in a row!
            </span>
          </div>
        </div>
        {/* Favorite Palettes */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <span className="font-bold text-lg">Favorite Color Palettes</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {palettes.length === 0 ? (
              <span className="text-xs text-gray-400">No palettes yet</span>
            ) : (
              palettes.map((p) => (
                <div key={p.name} className="flex flex-col items-center">
                  <div className="flex gap-1 mb-1">
                    {p.colors.map((c) => (
                      <span
                        key={c}
                        className="w-6 h-6 rounded-full border"
                        style={{ background: c }}
                      ></span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">{p.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Outfit History & Journal */}
      <div className="bg-white/80 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrophyIcon className="w-5 h-5 text-pink-400" />
          <span className="font-bold text-lg">Your Outfits & Style Journal</span>
          <span className="ml-auto text-xs text-blue-500">
            Journal streak: {userProfile.journalStreak || 0} days <CheckCircleIcon className="inline w-4 h-4 text-green-500" />
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {outfits.length === 0 ? (
            <span className="text-gray-400">No outfits uploaded yet.</span>
          ) : (
            outfits.map((o, idx) => (
              <div
                key={o.id}
                className="bg-pink-50 rounded-lg p-4 flex gap-4 items-center shadow hover:shadow-xl transition"
              >
                <img
                  src={o.imageUrl}
                  alt="Outfit"
                  className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-pink-600">
                      {o.colorRating || o.rating || "-"}
                      /10
                    </span>
                    {o.favorite && <StarIcon className="w-5 h-5 text-yellow-400" />}
                  </div>
                  <div className="flex gap-1 my-1">
                    {(o.suggestedPalette || o.palette || []).map((c) => (
                      <span
                        key={c}
                        className="w-4 h-4 rounded-full"
                        style={{ background: c }}
                      ></span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">{o.feedback || o.aiNote}</span>
                </div>
                <button
                  className="text-xs text-gray-400 hover:text-pink-500"
                  title="Delete"
                  // Add delete logic here
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Personal Suggestions & Gamified Challenges */}
      <div className="bg-white/80 rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="font-bold mb-2">Personal Suggestions</div>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="font-bold mb-2">Weekly Challenge</div>
          <div className="bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-lg p-4 flex items-center gap-3 shadow animate-pulse">
            <TrophyIcon className="w-8 h-8" />
            <span className="font-semibold">
              Complete the “7-Day Style Challenge” for bonus XP!
            </span>
          </div>
          <button className="bg-pink-400 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-500 transition mt-4">
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
