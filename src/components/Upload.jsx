import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CloudArrowUpIcon, 
  CheckCircleIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  SparklesIcon,
  LightBulbIcon,
  ArrowsPointingOutIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/solid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase";
import ColorThief from "color-thief-browser";

// Enhanced mood, skin tone, and palette options
const moodOptions = [
  { label: "😊 Confident", bg: "bg-blue-100", text: "text-blue-700", aiPrompt: "outfit that radiates confidence" },
  { label: "🌧️ Cozy", bg: "bg-yellow-100", text: "text-yellow-700", aiPrompt: "comfortable and cozy outfit" },
  { label: "🌞 Bright", bg: "bg-yellow-200", text: "text-yellow-800", aiPrompt: "vibrant and energetic outfit" },
  { label: "❄️ Cool", bg: "bg-blue-200", text: "text-blue-800", aiPrompt: "cool and composed outfit" },
  { label: "🧘 Calm", bg: "bg-green-100", text: "text-green-700", aiPrompt: "peaceful and balanced outfit" },
  { label: "💃 Bold", bg: "bg-purple-100", text: "text-purple-700", aiPrompt: "bold and statement-making outfit" }
];

const skinTones = [
  { name: "Fair", color: "#fbeee6", match: [255, 224, 189], undertone: "cool" },
  { name: "Light", color: "#f3d7b6", match: [240, 200, 160], undertone: "neutral" },
  { name: "Medium", color: "#e0ac69", match: [224, 172, 105], undertone: "warm" },
  { name: "Olive", color: "#c68642", match: [198, 134, 66], undertone: "olive" },
  { name: "Brown", color: "#8d5524", match: [141, 85, 36], undertone: "warm" },
  { name: "Dark", color: "#5d3a1a", match: [93, 58, 26], undertone: "cool" }
];

const colorPalettes = {
  Fair: ["#FFB6C1", "#87CEEB", "#D8BFD8", "#F0E68C", "#98FB98"],
  Light: ["#F4A460", "#90EE90", "#FFA07A", "#9370DB", "#20B2AA"],
  Medium: ["#6A5ACD", "#FF6347", "#FFD700", "#32CD32", "#FF69B4"],
  Olive: ["#8FBC8F", "#DAA520", "#BDB76B", "#CD5C5C", "#4682B4"],
  Brown: ["#4B0082", "#F5DEB3", "#DEB887", "#556B2F", "#9932CC"],
  Dark: ["#00CED1", "#C71585", "#808000", "#DA70D6", "#1E90FF"]
};

const AIStyleAdvisor = ({ skinTone, selectedMoods }) => {
  const [aiAdvice, setAiAdvice] = useState("");
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  
  const generateAdvice = async () => {
    setLoadingAdvice(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const moodPrompts = selectedMoods.map(m => m.aiPrompt).join(" and ");
      const undertone = skinTones.find(t => t.name === skinTone)?.undertone || "your";
      
      const advice = `For your ${skinTone} skin with ${undertone} undertones, I recommend ${
        moodPrompts || "a versatile look"
      }. Try pairing with ${colorPalettes[skinTone]?.slice(0, 2).join(" or ")} for a harmonious appearance.`;
      
      setAiAdvice(advice);
    } catch (error) {
      setAiAdvice("Couldn't generate advice. Please try again later.");
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <SparklesIcon className="w-5 h-5 text-purple-500 mr-2" />
          AI Style Advisor
        </h3>
        <button 
          onClick={generateAdvice}
          disabled={!skinTone || loadingAdvice}
          className="text-xs bg-gradient-to-r from-purple-400 to-indigo-400 text-white px-3 py-1 rounded-full hover:from-purple-500 hover:to-indigo-500 transition flex items-center"
        >
          {loadingAdvice ? "Generating..." : "Get Advice"}
        </button>
      </div>
      
      {aiAdvice && (
        <div className="bg-white p-3 rounded-lg text-sm animate-fade-in">
          <p className="text-gray-700">{aiAdvice}</p>
        </div>
      )}
      
      {!aiAdvice && (
        <p className="text-sm text-gray-500 italic">
          {skinTone 
            ? "Get personalized styling tips based on your skin tone and mood."
            : "Select your skin tone to enable AI style advice."}
        </p>
      )}
    </div>
  );
};

const BodyPositivityPanel = ({ confidenceLevel, setConfidenceLevel }) => {
  const [showAffirmations, setShowAffirmations] = useState(false);
  const [activeTip, setActiveTip] = useState(0);
  
  const affirmations = [
    "Your style is a reflection of your unique personality.",
    "Every outfit you wear tells your beautiful story.",
    "Confidence is your best accessory.",
    "You deserve to feel amazing in whatever you choose to wear.",
    "Your body is worthy of love and beautiful clothes."
  ];
  
  const styleTips = [
    "Try the 'rule of thirds' for balanced outfits",
    "Monochromatic looks create an elongating effect",
    "Accessories can transform a simple outfit",
    "Proper fit is more important than size labels",
    "Layering adds depth to your outfits"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % styleTips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">💖 Style Wellness</h3>
      <div className="space-y-3">
        <div className="bg-white/80 p-2 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Daily Style Tip</p>
          <p className="text-sm font-medium flex items-center">
            <LightBulbIcon className="w-4 h-4 text-yellow-500 mr-2" />
            {styleTips[activeTip]}
          </p>
        </div>
        
        <button 
          onClick={() => setShowAffirmations(!showAffirmations)}
          className="w-full bg-pink-300 text-pink-800 py-2 rounded-full text-sm hover:bg-pink-400 transition flex items-center justify-center"
        >
          {showAffirmations ? "Hide Affirmation" : "Get Style Affirmation"}
        </button>
        
        {showAffirmations && (
          <div className="bg-white p-3 rounded-lg animate-fade-in shadow-sm">
            <p className="text-sm text-gray-700 italic text-center">
              "{affirmations[Math.floor(Math.random() * affirmations.length)]}"
            </p>
          </div>
        )}
        
        <div>
          <label className="text-sm text-gray-600 block mb-1">Today's Confidence Level</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(e.target.value)}
            className="w-full accent-pink-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Needs Boost</span>
            <span className="font-medium">{confidenceLevel}/10</span>
            <span>Feeling Great</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StyleJournal = ({ outfitDetails }) => {
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [outfitTags, setOutfitTags] = useState([]);
  
  const goals = ["Feel Confident", "Try Something New", "Express Creativity", "Comfort First", "Make a Statement"];
  const tags = ["Workwear", "Casual", "Formal", "Weekend", "Date Night", "Special Occasion"];
  
  const toggleGoal = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };
  
  const toggleTag = (tag) => {
    setOutfitTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        📝 <span className="ml-2">Style Journal</span>
      </h3>
      
      {outfitDetails && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Today's Outfit Details</h4>
          <div className="flex flex-wrap gap-2">
            {outfitDetails.moods?.map((mood, i) => (
              <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {mood.replace(/^[^a-zA-Z]+/, '')}
              </span>
            ))}
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {outfitDetails.skinTone} Skin
            </span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              Score: {outfitDetails.rating}/10
            </span>
          </div>
        </div>
      )}
      
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
      
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">Outfit Tags:</label>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button 
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs transition ${
                outfitTags.includes(tag)
                  ? 'bg-pink-400 text-white'
                  : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      <button className="mt-3 w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm hover:from-pink-500 hover:to-purple-500 transition flex items-center justify-center">
        Save Journal Entry
      </button>
    </div>
  );
};

const CommunityFeatures = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postText, setPostText] = useState("");
  const [activeFilter, setActiveFilter] = useState("trending");
  
  const communityPosts = [
    { 
      id: 1, 
      author: "StyleStar22", 
      content: "Tried a bold color today and felt amazing! 💪 #confidenceboost", 
      likes: 12, 
      comments: 3,
      tags: ["bold", "colorful"],
      time: "2h ago"
    },
    { 
      id: 2, 
      author: "FashionExplorer", 
      content: "Mixed patterns for the first time - stepping out of my comfort zone! 👗👖", 
      likes: 8, 
      comments: 5,
      tags: ["patternmixing", "firsttry"],
      time: "5h ago"
    },
    { 
      id: 3, 
      author: "ConfidentMe", 
      content: "Learning to love my style journey, one outfit at a time ✨ #bodypositivity", 
      likes: 15, 
      comments: 7,
      tags: ["selflove", "journey"],
      time: "1d ago"
    }
  ];

  return (
    <div className="mt-6 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        👥 <span className="ml-2">Style Community</span>
      </h3>
      
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {["trending", "recent", "popular", "following"].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-full text-xs capitalize transition ${
              activeFilter === filter
                ? 'bg-pink-400 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => setShowCreatePost(!showCreatePost)}
        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 rounded-full mb-4 hover:from-purple-500 hover:to-pink-500 transition flex items-center justify-center"
      >
        Share Your Style Journey
      </button>
      
      {showCreatePost && (
        <div className="space-y-3 animate-fade-in bg-gray-50 p-3 rounded-lg mb-4">
          <textarea 
            placeholder="Share how your outfit made you feel today..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-3 border rounded-lg h-20 text-sm resize-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition flex items-center">
                <ArrowsPointingOutIcon className="w-3 h-3 mr-1" /> Photo
              </button>
              <button className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition flex items-center">
                <ShoppingBagIcon className="w-3 h-3 mr-1" /> Products
              </button>
            </div>
            <button 
              disabled={!postText}
              className="text-xs bg-pink-400 text-white px-3 py-1 rounded-full hover:bg-pink-500 transition flex items-center disabled:opacity-50"
            >
              Share
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {communityPosts.map(post => (
          <div key={post.id} className="bg-gray-50 p-3 rounded-lg hover:shadow-sm transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-medium">{post.author}</span>
                  <span className="text-xs text-gray-500 block">{post.time}</span>
                </div>
              </div>
              <button className="text-xs text-gray-400 hover:text-gray-600">
                ···
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-2">{post.content}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex space-x-4 pt-2 border-t border-gray-200">
              <button className="flex items-center space-x-1 text-xs text-pink-500 hover:text-pink-600">
                <HeartIcon className="w-3 h-3" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-600">
                <ChatBubbleLeftIcon className="w-3 h-3" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StyleChallenges = () => {
  const [challenges, setChallenges] = useState([
    { id: 1, title: "Try a new color", progress: 2, total: 3, reward: "Color Explorer Badge", emoji: "🎨", completed: false },
    { id: 2, title: "Mix patterns", progress: 1, total: 2, reward: "Pattern Master Badge", emoji: "🔄", completed: false },
    { id: 3, title: "Confidence selfie", progress: 0, total: 1, reward: "Self-Love Champion", emoji: "📸", completed: false }
  ]);

  const completeChallenge = (id) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === id) {
        const newProgress = challenge.progress + 1;
        const completed = newProgress >= challenge.total;
        return { ...challenge, progress: newProgress, completed };
      }
      return challenge;
    }));
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        🏆 <span className="ml-2">Style Challenges</span>
      </h3>
      <div className="space-y-3">
        {challenges.map(challenge => (
          <div key={challenge.id} className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg relative overflow-hidden">
            {challenge.completed && (
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                Completed!
              </div>
            )}
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
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">🎁 {challenge.reward}</span>
              <button
                onClick={() => completeChallenge(challenge.id)}
                disabled={challenge.completed}
                className={`text-xs px-2 py-1 rounded-full transition ${
                  challenge.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-400 text-white hover:bg-blue-500'
                }`}
              >
                {challenge.completed ? '✅ Done' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-center text-sm text-blue-500 hover:text-blue-700 hover:underline">
        View All Challenges
      </button>
    </div>
  );
};

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
  const [outfitHistory, setOutfitHistory] = useState([]);
  const fileInput = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.match('image.*')) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setStep(2);
      setAnalysis(null);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.match('image.*')) {
      setFile(dropped);
      setPreview(URL.createObjectURL(dropped));
      setStep(2);
      setAnalysis(null);
    }
  };

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const analyzeColors = async () => {
    if (!imgRef.current || !skinTone) return;
    
    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const colorThief = new ColorThief();
      const dominant = await colorThief.getColor(imgRef.current);
      const palette = colorPalettes[skinTone] || [];
      const rating = getStyleRating(dominant, skinTones.find(t => t.name === skinTone)?.match || [0,0,0]);
      const feedback = getStyleFeedback(rating, skinTone);
      
      setAnalysis({ 
        dominant, 
        rating, 
        feedback, 
        palette,
        skinTone,
        moods: selectedMoods.map(m => m.label)
      });
      setStep(3);
    } catch (err) {
      console.error("Color extraction failed:", err);
      alert("Couldn't analyze the image. Please try another photo.");
    } finally {
      setUploading(false);
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
      const fileName = `${Date.now()}-${file.name}`;
      const fileRef = ref(storage, `uploads/${user.uid}/${fileName}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      const newOutfit = {
        userId: user.uid,
        imageUrl: downloadURL,
        skinTone,
        moods: selectedMoods.map((m) => m.label),
        colorRating: analysis.rating,
        feedback: analysis.feedback,
        suggestedPalette: analysis.palette,
        confidenceLevel,
        createdAt: new Date().toISOString()
      };

      setOutfitHistory(prev => [newOutfit, ...prev]);
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
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

              {/* Upload Flow */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition ${step >= num ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md" : "bg-gray-200 text-gray-500"}`}>
                      {num}
                    </div>
                    {num < 3 && <div className={`h-1 w-8 transition ${step > num ? "bg-gradient-to-r from-pink-400 to-purple-400" : "bg-gray-200"}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Upload Your Outfit</h2>
              <p className="text-sm text-gray-500 text-center mb-4">
                <span className="font-medium">AI-Powered Style Analysis</span> – Discover your unique style story
              </p>

              {/* File Upload Area */}
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition mb-4 ${
                  preview 
                    ? "border-pink-400 bg-pink-50" 
                    : "border-pink-300 hover:bg-pink-50 hover:border-pink-400"
                }`}
                onClick={() => fileInput.current?.click()}
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
                      className="max-h-48 rounded shadow mb-2 animate-fade-in object-contain"
                      onLoad={() => imgRef.current && analyzeColors()}
                    />
                    <p className="text-gray-600 text-sm truncate max-w-xs">{file?.name}</p>
                    <button 
                      className="mt-2 text-xs text-pink-500 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null); 
                        setPreview(null); 
                        setStep(1); 
                        setAnalysis(null);
                      }}
                    >
                      Remove & choose another
                    </button>
                  </>
                ) : (
                  <>
                    <CloudArrowUpIcon className="w-12 h-12 text-pink-400 mb-2 animate-bounce" />
                    <span className="text-gray-500 mb-2">Drag & drop or click to select</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                      ref={fileInput} 
                    />
                  </>
                )}
              </div>

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
                          className={`flex items-center gap-2 px-3 py-2 rounded-full border transition ${
                            skinTone === tone.name 
                              ? "ring-2 ring-pink-400 scale-105 bg-white shadow-sm" 
                              : "opacity-80 hover:opacity-100 hover:scale-105"
                          }`}
                          style={{ 
                            background: skinTone === tone.name ? 'white' : tone.color, 
                            color: skinTone === tone.name ? "#333" : "#222" 
                          }}
                        >
                          <span className="w-4 h-4 rounded-full border" style={{ 
                            background: tone.color, 
                            borderColor: skinTone === tone.name ? "#FF4D89" : "#bbb" 
                          }}></span>
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
                          className={`px-3 py-2 rounded-full text-sm font-medium border transition ${
                            mood.bg
                          } ${
                            mood.text
                          } ${
                            selectedMoods.includes(mood) 
                              ? "ring-2 ring-pink-400 scale-105 shadow-sm" 
                              : "opacity-80 hover:opacity-100 hover:scale-105"
                          }`}
                        >
                          {mood.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-50 flex items-center justify-center"
                    onClick={analyzeColors}
                    disabled={!skinTone || uploading}
                  >
                    {uploading ? "Analyzing..." : "Analyze Outfit Colors"}
                  </button>

                  {analysis && (
                    <div className="mt-6 bg-white p-4 rounded-lg border animate-fade-in">
                      <h3 className="text-lg font-semibold mb-3">Style Analysis Results</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Color Harmony Score:</span>
                          <span className="text-lg font-bold text-pink-500">{analysis.rating}/10</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">{analysis.feedback}</p> 
                                                  </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Suggested Colors for You:</p>
                          <div className="flex flex-wrap gap-2">
                            {analysis.palette.map((color, i) => (
                              <div 
                                key={i}
                                className="w-8 h-8 rounded-full shadow-sm border border-gray-200"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <button
                      className="mt-6 w-full bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 rounded-full font-semibold hover:from-green-500 hover:to-blue-500 transition disabled:opacity-50 flex items-center justify-center"
                      onClick={handleUpload}
                      disabled={uploading || success}
                    >
                      {uploading ? (
                        "Uploading..."
                      ) : success ? (
                        <>
                          <CheckCircleIcon className="w-5 h-5 mr-2" />
                          Uploaded Successfully!
                        </>
                      ) : (
                        "Save to My Style Diary"
                      )}
                    </button>
                  )}
                </>
              )}

              {/* AI Style Advisor */}
              {skinTone && (
                <AIStyleAdvisor 
                  skinTone={skinTone} 
                  selectedMoods={selectedMoods} 
                />
              )}

              {/* Style Journal */}
              {analysis && (
                <StyleJournal outfitDetails={{
                  skinTone,
                  moods: selectedMoods.map(m => m.label),
                  rating: analysis.rating
                }} />
              )}
            </>
          )}

          {activeTab === "community" && (
            <CommunityFeatures />
          )}

          {activeTab === "challenges" && (
            <StyleChallenges />
          )}
        </div>

        {/* Outfit History Preview */}
        {outfitHistory.length > 0 && (
          <div className="mt-6 bg-white/90 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-3">📚 Your Recent Outfits</h3>
            <div className="grid grid-cols-3 gap-2">
              {outfitHistory.slice(0, 3).map((outfit, i) => (
                <div key={i} className="relative group">
                  <img 
                    src={outfit.imageUrl} 
                    alt={`Outfit ${i}`}
                    className="w-full h-24 object-cover rounded-lg shadow-sm group-hover:opacity-80 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end p-2 opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white text-xs font-medium">
                      {outfit.rating}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate("/outfits")}
              className="mt-3 w-full text-center text-sm text-pink-500 hover:text-pink-700 hover:underline"
            >
              View All Outfits
            </button>
          </div>
        )}
      </div>
    </div>
  );
}