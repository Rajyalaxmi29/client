import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  UserCircleIcon,
  SparklesIcon,
  TrashIcon,
  TrophyIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CubeIcon,
  BeakerIcon,
  SwatchIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  MicrophoneIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

import { auth } from "../firebase"; // Only for authentication, not Firestore

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [styleScore, setStyleScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [trendingColors, setTrendingColors] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [arMode, setArMode] = useState(false);

  const videoRef = useRef(null);

  // Helper functions
  const findDominantColor = useCallback((colors) => {
    if (!colors.length) return "#000000";
    return colors[0];
  }, []);

  const getComplementaryColor = useCallback((color) => {
    return "complementary";
  }, []);

  const getBestDayOfWeek = useCallback((outfitList) => {
    return "Tuesday";
  }, []);

  const generateTrendPrediction = useCallback((outfitList) => {
    return "Sustainable Minimalism";
  }, []);

  // AI-powered suggestions
  const generateAISuggestions = useCallback((outfitList) => {
    const recentColors = outfitList.slice(0, 5).flatMap(outfit => outfit.suggestedPalette || []);
    const dominantColor = findDominantColor(recentColors);

    const aiSuggestions = [
      `Based on your color preferences, try complementary ${getComplementaryColor(dominantColor)} tones`,
      `Your style confidence peaks on ${getBestDayOfWeek(outfitList)} - plan special outfits accordingly`,
      `Trending: ${generateTrendPrediction(outfitList)} aesthetic matches your style DNA perfectly`
    ];

    setAiSuggestions(aiSuggestions);
  }, [findDominantColor, getComplementaryColor, getBestDayOfWeek, generateTrendPrediction]);

  // Calculate metrics
  const calculateStyleMetrics = useCallback((outfitList) => {
    const totalOutfits = outfitList.length;
    const avgRating = totalOutfits > 0
      ? outfitList.reduce((sum, outfit) => sum + (outfit.colorRating || 0), 0) / totalOutfits
      : 0;
    setStyleScore(Math.round(avgRating * 10));

    // Calculate streak
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const hasOutfit = outfitList.some(outfit =>
        outfit.date === checkDate.toISOString().split('T')[0]
      );
      if (hasOutfit) streak++;
      else break;
    }
    setCurrentStreak(streak);
  }, []);

  // Fetch data (CHANGED: Now uses fetch to your Express backend)
  useEffect(() => {
    const fetchAdvancedData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Fetch outfits from your Express backend
      try {
        const response = await fetch(`http://localhost:5000/api/outfits/${auth.currentUser.uid}`);
        const outfitList = await response.json();
        setOutfits(outfitList.sort((a, b) => (b.date || "").localeCompare(a.date || "")));
        calculateStyleMetrics(outfitList);
        generateAISuggestions(outfitList);
      } catch (error) {
        console.error("Error fetching outfits:", error);
      }

      // Fetch user profile (simulate or replace with your own backend call)
      // If you move user profiles to MongoDB, fetch from your backend here!
      // For now, we'll just simulate:
      setUserProfile({
        name: user.displayName || "Style Innovator",
        skinTone: "Medium",
        level: 1,
        xp: 0,
        journalStreak: 0,
        skinColor: "#e0ac69"
      });

      // Simulated achievements and trending colors
      setAchievements([
        { id: 1, name: "Style Pioneer", icon: "🚀", unlocked: true },
        { id: 2, name: "Color Harmony Master", icon: "🎨", unlocked: true },
        { id: 3, name: "Sustainability Champion", icon: "🌱", unlocked: false },
        { id: 4, name: "Trend Predictor", icon: "🔮", unlocked: true }
      ]);
      setTrendingColors([
        { color: "#FF6B6B", name: "Coral Blush", popularity: 94 },
        { color: "#4ECDC4", name: "Mint Fresh", popularity: 87 },
        { color: "#45B7D1", name: "Sky Blue", popularity: 92 },
        { color: "#96CEB4", name: "Sage Green", popularity: 89 }
      ]);
    };

    fetchAdvancedData();
  }, [calculateStyleMetrics, generateAISuggestions]);

  // Voice command handler
  const handleVoiceCommand = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setVoiceCommand("Show me outfit suggestions for today");
        setIsRecording(false);
      }, 2000);
    }
  };

  // AR Mode toggle
  const toggleARMode = () => {
    setArMode(!arMode);
    if (!arMode && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        });
    }
  };

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <span className="text-2xl text-white font-bold">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  // ... (rest of your component remains unchanged)
  // Paste the rest of your JSX and logic here, as in your original code.
  // For brevity, I am not repeating the full JSX since you said not to change any functionality.

  // --- Begin your existing JSX return block here ---
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] relative overflow-hidden">
      {/* Floating AR/Voice Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleARMode}
          className={`p-3 rounded-full shadow-lg transition-all ${
            arMode ? 'bg-green-500 text-white' : 'bg-white text-gray-700'
          } hover:scale-110`}
        >
          <CubeIcon className="w-6 h-6" />
        </button>
        <button
          onClick={handleVoiceCommand}
          className={`p-3 rounded-full shadow-lg transition-all ${
            isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-gray-700'
          } hover:scale-110`}
        >
          <MicrophoneIcon className="w-6 h-6" />
        </button>
      </div>

      {/* AR Overlay */}
      {arMode && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">AR Virtual Try-On</h3>
            <video ref={videoRef} autoPlay className="w-full rounded-lg mb-4" />
            <div className="flex gap-2 justify-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Try Outfit</button>
              <button 
                onClick={() => setArMode(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="py-8 px-2 md:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 p-1">
                  <UserCircleIcon className="w-full h-full text-white bg-purple-600 rounded-full p-2" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-400 rounded-full p-2">
                  <SparklesIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{userProfile.name || "Style Innovator"}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Skin Tone:</span>
                    <span
                      className="inline-block w-8 h-8 rounded-full border-2 border-white"
                      style={{ background: "#e0ac69"/*userProfile.skinColor*/}}
                    ></span>
                    <span className="text-sm">{userProfile.skinTone}</span>
                  </div>
                </div>
                {/* Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{styleScore}</div>
                    <div className="text-xs opacity-75">Style Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{currentStreak}</div>
                    <div className="text-xs opacity-75">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userProfile.level || 1}</div>
                    <div className="text-xs opacity-75">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userProfile.xp || 0}</div>
                    <div className="text-xs opacity-75">XP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: ChartBarIcon },
              { id: 'ai', label: 'AI Suggestions', icon: BeakerIcon },
              { id: 'trends', label: 'Trends', icon: SwatchIcon },
              { id: 'challenges', label: 'Challenges', icon: TrophyIcon },
              { id: 'ar', label: 'AR Studio', icon: CubeIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Based on Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Achievements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <TrophyIcon className="w-6 h-6 text-yellow-500" />
                <span className="font-bold text-xl">Achievements</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="font-bold mb-1">{achievement.name}</h4>
                    {achievement.unlocked && (
                      <div className="mt-2 flex items-center gap-1">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600">Unlocked!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Outfit History */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrophyIcon className="w-5 h-5 text-pink-400" />
                <span className="font-bold text-lg">Your Outfits & Style Journal</span>
                <span className="ml-auto text-xs text-blue-500 flex items-center gap-1">
                  <FireIcon className="w-4 h-4" />
                  Streak: {userProfile.journalStreak || 0} days
                  <CheckCircleIcon className="inline w-4 h-4 text-green-500" />
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {outfits.length === 0 ? (
                  <div className="col-span-2 text-center py-12">
                   
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Start Your Style Journey</h3>
                    <p className="text-gray-500 mb-4">Upload your first outfit to unlock AI-powered insights!</p>
                  </div>
                ) : (
                  outfits.map((outfit, idx) => (
                    <div
                      key={outfit.id}
                      className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 flex gap-4 items-center shadow-lg hover:shadow-2xl transition-all group"
                    >
                      <div className="relative">
                        <img
                          src={outfit.imageUrl}
                          alt="Outfit"
                          className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          {outfit.colorRating || outfit.rating || "-"}/10
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg text-purple-600">
                            AI Score: {outfit.colorRating || outfit.rating || "-"}/10
                          </span>
                          
                        </div>
                        <div className="flex gap-1 my-2">
                          {(outfit.suggestedPalette || outfit.palette || []).map((color, i) => (
                            <span
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ background: color }}
                            ></span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{outfit.feedback || outfit.aiNote}</p>
                      </div>
                      <button
                        className="text-xs text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-all"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'ai' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <BeakerIcon className="w-6 h-6 text-purple-500" />
              <span className="font-bold text-xl">AI Suggestions</span>
            </div>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-white rounded-xl">
                  <LightBulbIcon className="w-5 h-5 text-yellow-500 mt-1" />
                  <span className="text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <SwatchIcon className="w-6 h-6 text-pink-500" />
              <span className="font-bold text-xl">Trending Colors</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingColors.map((color, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <div 
                    className="w-full h-24 rounded-xl shadow-lg transition-all group-hover:scale-110 group-hover:shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${color.color}, ${color.color}80)` }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all"></div>
                  <div className="mt-2 text-center">
                    <h4 className="font-semibold text-sm">{color.name}</h4>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <ArrowTrendingUpIcon className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">{color.popularity}% match</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <TrophyIcon className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-xl">Weekly Challenge</span>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg p-4 flex items-center gap-3">
              <TrophyIcon className="w-8 h-8" />
              <div>
                <span className="font-bold block">Sustainable Chic Week</span>
                <span className="text-sm">Earn 500 XP + Eco Badge</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ar' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 text-center">
            <CubeIcon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">AR Virtual Try-On</h3>
            <p className="text-gray-600 mb-4">Try on outfits virtually using your camera!</p>
            <button
              onClick={toggleARMode}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transition-all"
            >
              {arMode ? "Close AR Studio" : "Open AR Studio"}
            </button>
          </div>
        )}

        {/* Voice Command Display */}
        {voiceCommand && (
          <div className="fixed bottom-4 left-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-2xl z-30">
            <div className="flex items-center gap-3">
              <MicrophoneIcon className="w-6 h-6" />
              <div>
                <div className="text-sm opacity-75">Voice Command Received:</div>
                <div className="font-semibold">"{voiceCommand}"</div>
              </div>
              <button 
                onClick={() => setVoiceCommand('')}
                className="ml-auto text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
