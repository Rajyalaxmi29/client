import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CloudArrowUpIcon, CheckCircleIcon, HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase";
import ColorThief from "color-thief-browser";

// Mood, skin tone, and palette options (unchanged)
const moodOptions = [
  { label: "😊 Confident", bg: "bg-blue-100", text: "text-blue-700" },
  { label: "🌧️ Cozy", bg: "bg-yellow-100", text: "text-yellow-700" },
  { label: "🌞 Bright", bg: "bg-yellow-200", text: "text-yellow-800" },
  { label: "❄️ Cool", bg: "bg-blue-200", text: "text-blue-800" },
  { label: "🧘 Calm", bg: "bg-green-100", text: "text-green-700" }
];

const skinTones = [
  { name: "Fair", color: "#fbeee6", match: [255, 224, 189] },
  { name: "Light", color: "#f3d7b6", match: [240, 200, 160] },
  { name: "Medium", color: "#e0ac69", match: [224, 172, 105] },
  { name: "Olive", color: "#c68642", match: [198, 134, 66] },
  { name: "Brown", color: "#8d5524", match: [141, 85, 36] },
  { name: "Dark", color: "#5d3a1a", match: [93, 58, 26] }
];

const colorPalettes = {
  Fair: ["#FFB6C1", "#87CEEB", "#D8BFD8"],
  Light: ["#F4A460", "#90EE90", "#FFA07A"],
  Medium: ["#6A5ACD", "#FF6347", "#FFD700"],
  Olive: ["#8FBC8F", "#DAA520", "#BDB76B"],
  Brown: ["#4B0082", "#F5DEB3", "#DEB887"],
  Dark: ["#00CED1", "#C71585", "#808000"]
};

// BodyPositivityPanel, StyleJournal, CommunityFeatures, StyleChallenges components (unchanged)
const BodyPositivityPanel = ({ confidenceLevel, setConfidenceLevel }) => {
  const [showAffirmations, setShowAffirmations] = useState(false);
  const affirmations = [
    "Your style is a reflection of your unique personality.",
    "Every outfit you wear tells your beautiful story.",
    "Confidence is your best accessory.",
    "You deserve to feel amazing in whatever you choose to wear.",
    "Your body is worthy of love and beautiful clothes."
  ];
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">💖 Your Daily Boost</h3>
      <div className="space-y-3">
        <button 
          onClick={() => setShowAffirmations(!showAffirmations)}
          className="w-full bg-pink-300 text-pink-800 py-2 rounded-full text-sm hover:bg-pink-400 transition"
        >
          {showAffirmations ? "Hide Affirmation" : "Get Daily Affirmation"}
        </button>
        {showAffirmations && (
          <div className="bg-white p-3 rounded-lg animate-fade-in shadow-sm">
            <p className="text-sm text-gray-700 italic text-center">
              "{affirmations[Math.floor(Math.random() * affirmations.length)]}"
            </p>
          </div>
        )}
        <div>
          <label className="text-sm text-gray-600 block mb-1">How confident do you feel today?</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span className="font-medium">{confidenceLevel}/10</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StyleJournal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const goals = ["Feel Confident", "Try Something New", "Express Creativity", "Comfort First", "Make a Statement"];
  const toggleGoal = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };
  return (
    <div className="mt-6 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        📝 <span className="ml-2">Style Journal</span>
      </h3>
      <textarea
        placeholder="How did this outfit make you feel? What did you love about it? Any styling wins or lessons learned?"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        className="w-full p-3 border rounded-lg h-24 text-sm resize-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
      />
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">Today's Style Goals:</label>
        <div className="flex flex-wrap gap-2">
          {goals.map(goal => (
            <button 
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={`px-3 py-1 rounded-full text-xs transition ${
                selectedGoals.includes(goal)
                  ? 'bg-blue-400 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
      <button className="mt-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm hover:from-pink-500 hover:to-purple-500 transition">
        Save Journal Entry
      </button>
    </div>
  );
};

const CommunityFeatures = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postText, setPostText] = useState("");
  const communityPosts = [
    { id: 1, author: "StyleStar22", content: "Tried a bold color today and felt amazing! 💪", likes: 12, comments: 3 },
    { id: 2, author: "FashionExplorer", content: "Mixed patterns for the first time - stepping out of my comfort zone!", likes: 8, comments: 5 },
    { id: 3, author: "ConfidentMe", content: "Learning to love my style journey, one outfit at a time ✨", likes: 15, comments: 7 }
  ];
  return (
    <div className="mt-6 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        👥 <span className="ml-2">Style Community</span>
      </h3>
      <button 
        onClick={() => setShowCreatePost(!showCreatePost)}
        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 rounded-full mb-4 hover:from-purple-500 hover:to-pink-500 transition"
      >
        Share Your Style Journey
      </button>
      {showCreatePost && (
        <div className="space-y-3 animate-fade-in bg-gray-50 p-3 rounded-lg mb-4">
          <textarea 
            placeholder="Share how your outfit made you feel today..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-3 border rounded-lg h-20 text-sm resize-none"
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition">📷 Photo</button>
              <button className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition">🏷️ Tags</button>
            </div>
            <button className="text-xs bg-pink-400 text-white px-3 py-1 rounded-full hover:bg-pink-500 transition">
              Share
            </button>
          </div>
        </div>
      )}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {communityPosts.map(post => (
          <div key={post.id} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {post.author.charAt(0)}
              </div>
              <span className="text-sm font-medium">{post.author}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{post.content}</p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-xs text-pink-500 hover:text-pink-600">
                <HeartIcon className="w-3 h-3" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-600">
                <ChatBubbleLeftIcon className="w-3 h-3" />
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StyleChallenges = () => {
  const [challenges] = useState([
    { id: 1, title: "Try a new color", progress: 2, total: 3, reward: "Color Explorer Badge", emoji: "🎨" },
    { id: 2, title: "Mix patterns", progress: 1, total: 2, reward: "Pattern Master Badge", emoji: "🔄" },
    { id: 3, title: "Confidence selfie", progress: 0, total: 1, reward: "Self-Love Champion", emoji: "📸" }
  ]);
  return (
    <div className="mt-6 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        🏆 <span className="ml-2">Style Challenges</span>
      </h3>
      <div className="space-y-3">
        {challenges.map(challenge => (
          <div key={challenge.id} className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium flex items-center">
                <span className="mr-2">{challenge.emoji}</span>
                {challenge.title}
              </span>
              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">
                {challenge.progress}/{challenge.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 flex items-center justify-between">
              <span>🎁 Reward: {challenge.reward}</span>
              {challenge.progress === challenge.total && (
                <span className="text-green-600 font-medium">✅ Complete!</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main enhanced component
export default function EnhancedUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [skinTone, setSkinTone] = useState("");
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [confidenceLevel, setConfidenceLevel] = useState(5);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInput = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
    setStep(2);
    setAnalysis(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    setFile(dropped);
    setPreview(dropped ? URL.createObjectURL(dropped) : null);
    setStep(2);
    setAnalysis(null);
  };

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const analyzeColors = async () => {
    if (!imgRef.current || !skinTone) return;
    const colorThief = new ColorThief();
    try {
      const dominant = await colorThief.getColor(imgRef.current);
      const palette = colorPalettes[skinTone] || [];
      const rating = getStyleRating(dominant, skinTones.find(t => t.name === skinTone)?.match || [0,0,0]);
      const feedback = getStyleFeedback(rating, skinTone);
      setAnalysis({ dominant, rating, feedback, palette });
      setStep(3);
    } catch (err) {
      console.error("Color extraction failed:", err);
    }
  };

  const getStyleRating = (color1, color2) => {
    const distance = Math.sqrt(
      color1.reduce((sum, c, i) => sum + (c - color2[i]) ** 2, 0)
    );
    return Math.max(1, Math.round(10 - distance / 25));
  };

  const getStyleFeedback = (rating, tone) => {
    if (rating > 7) return `🌟 This outfit color beautifully complements your ${tone} skin tone. You look absolutely radiant!`;
    if (rating > 4) return `👍 This creates a lovely balanced look with your ${tone} skin tone. You're glowing!`;
    return `💡 Try experimenting with warmer or cooler tones to enhance your natural ${tone} beauty. Every style journey is unique!`;
  };

  // ----------- CHANGED: Upload Handler Now Sends Data to MongoDB Backend -----------
  const handleUpload = async () => {
    if (!file || !skinTone || !analysis) {
      alert("Please select an outfit image, skin tone and analyze before uploading.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to upload.");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload image to Firebase Storage (as before)
      const fileName = `${Date.now()}-${file.name}`;
      const fileRef = ref(storage, `uploads/${user.uid}/${fileName}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      // 2. Send metadata to your backend (Node.js/Express + MongoDB Atlas)
      await fetch("http://localhost:5000/api/outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          imageUrl: downloadURL,
          skinTone,
          moods: selectedMoods.map((m) => m.label),
          colorRating: analysis.rating,
          feedback: analysis.feedback,
          suggestedPalette: analysis.palette,
          confidenceLevel,
          createdAt: new Date().toISOString()
        })
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard
      }, 1500);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  // -------------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white/90 rounded-2xl shadow-xl mb-6">
          <div className="flex border-b">
            {[
              { id: "upload", label: "✨ Style Analysis", icon: "📸" },
              { id: "community", label: "👥 Community", icon: "💬" },
              { id: "challenges", label: "🏆 Challenges", icon: "🎯" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-pink-400 text-white'
                    : 'text-gray-600 hover:text-pink-400'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6">
          {activeTab === "upload" && (
            <>
              {/* Body Positivity Panel */}
              <BodyPositivityPanel 
                confidenceLevel={confidenceLevel}
                setConfidenceLevel={setConfidenceLevel}
              />

              {/* Original Upload Flow with enhancements */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition ${step >= num ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-500"}`}>{num}</div>
                    {num < 3 && <div className={`h-1 w-8 transition ${step > num ? "bg-pink-400" : "bg-gray-200"}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Upload Your Outfit</h2>
              <p className="text-sm text-gray-500 text-center mb-4">
                <span className="font-medium">AI-Powered Style Analysis</span> – Discover your unique style story
              </p>

              {/* File Upload Area */}
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed border-pink-400 rounded-lg p-6 cursor-pointer transition mb-4 ${preview ? "bg-pink-50" : "hover:bg-pink-50"}`}
                onClick={() => fileInput.current && fileInput.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {preview ? (
                  <>
                    <img
                      ref={imgRef}
                      src={preview}
                      alt="Preview"
                      crossOrigin="anonymous"
                      className="max-h-48 rounded shadow mb-2 animate-fade-in"
                    />
                    <p className="text-gray-600">{file?.name}</p>
                    <button className="mt-2 text-xs text-pink-500 hover:underline" onClick={(e) => {
                      e.stopPropagation();
                      setFile(null); setPreview(null); setStep(1); setAnalysis(null);
                    }}>
                      Remove & choose another
                    </button>
                  </>
                ) : (
                  <>
                    <CloudArrowUpIcon className="w-12 h-12 text-pink-400 mb-2 animate-bounce" />
                    <span className="text-gray-500 mb-2">Drag & drop or click to select</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInput} />
                  </>
                )}
              </div>

              {/* Rest of your existing upload flow */}
              {step >= 2 && (
                <>
                  <div className="mt-4">
                    <p className="mb-2 font-semibold text-gray-700">Select your skin tone:</p>
                    <div className="flex flex-wrap gap-2">
                      {skinTones.map((tone) => (
                        <button
                          key={tone.name}
                          type="button"
                          onClick={() => setSkinTone(tone.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-full border transition ${skinTone === tone.name ? "ring-2 ring-pink-400 scale-105 bg-white" : "opacity-80 hover:opacity-100 hover:scale-105"}`}
                          style={{ background: skinTone === tone.name ? 'white' : tone.color, color: "#222" }}
                        >
                          <span className="w-4 h-4 rounded-full border" style={{ background: tone.color, borderColor: "#bbb" }}></span>
                          {tone.name}
                          {skinTone === tone.name && <CheckCircleIcon className="w-4 h-4 text-pink-500" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-2 font-semibold text-gray-700">How does this outfit make you feel?</p>
                    <div className="flex flex-wrap gap-2">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood.label}
                          type="button"
                          onClick={() => toggleMood(mood)}
                          className={`px-3 py-2 rounded-full text-sm font-medium border transition ${mood.bg} ${mood.text} ${selectedMoods.includes(mood) ? "ring-2 ring-pink-400 scale-105" : "opacity-80 hover:opacity-100 hover:scale-105"}`}
                        >
                          {mood.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-50"
                    onClick={analyzeColors}
                    disabled={!file || !skinTone}
                  >
                    ✨ Analyze Outfit with AI
                  </button>
                </>
              )}

              {step === 3 && analysis && (
                <div className="mt-6 p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 animate-fade-in">
                  <p className="font-semibold mb-2 text-center">🎨 AI Style Analysis</p>
                  <div className="text-center mb-3">
                    <span className="text-2xl font-bold text-pink-500">{analysis.rating}/10</span>
                    <p className="text-sm text-gray-600">Style Harmony Score</p>
                  </div>
                  <p className="mb-3 text-center">{analysis.feedback}</p>
                  <div className="text-center">
                    <p className="font-semibold mb-2">🌈 Perfect Palette for {skinTone} skin:</p>
                    <div className="flex justify-center gap-2 mt-1">
                      {analysis.palette.map((color, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-md" style={{ background: color }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button
                className="mt-8 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-500 hover:to-blue-500 transition text-lg shadow-lg disabled:opacity-50"
                onClick={handleUpload}
                disabled={uploading || !analysis}
              >
                {success ? (
                  <span className="flex items-center justify-center gap-2 animate-pulse">
                    <CheckCircleIcon className="w-6 h-6 text-white" /> Uploaded Successfully! ✨
                  </span>
                ) : uploading ? "Uploading..." : "💾 Save to My Style Journey"}
              </button>

              {/* Style Journal */}
              <StyleJournal />
            </>
          )}

          {activeTab === "community" && <CommunityFeatures />}
          {activeTab === "challenges" && <StyleChallenges />}
        </div>
      </div>
    </div>
  );
}
