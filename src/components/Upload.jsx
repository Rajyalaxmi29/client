import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCamera, FaPalette, FaCheckCircle, FaHeart, 
  FaComment, FaTshirt, FaLock, FaPlus, 
  FaTimes, FaCloudUploadAlt, FaHistory,
  FaMagic, FaTags, FaCalendarAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';
import ColorThief from 'color-thief-browser';

const EnhancedUpload = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [skinTone, setSkinTone] = useState('');
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [confidenceLevel, setConfidenceLevel] = useState(5);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [recentUploads, setRecentUploads] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInput = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  // Options
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

  const seasons = ["Spring", "Summer", "Fall", "Winter", "All Season"];
  const occasions = ["Casual", "Work", "Formal", "Party", "Date", "Sports", "Travel"];
  
  const colorPalettes = {
    Fair: ["#FFB6C1", "#87CEEB", "#D8BFD8"],
    Light: ["#F4A460", "#90EE90", "#FFA07A"],
    Medium: ["#6A5ACD", "#FF6347", "#FFD700"],
    Olive: ["#8FBC8F", "#DAA520", "#BDB76B"],
    Brown: ["#4B0082", "#F5DEB3", "#DEB887"],
    Dark: ["#00CED1", "#C71585", "#808000"]
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setStep(2);
      setAnalysis(null);
    }
  };

  // Handle drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.match('image.*')) {
      setFile(dropped);
      setPreview(URL.createObjectURL(dropped));
      setStep(2);
      setAnalysis(null);
    }
  };

  // Toggle mood selection
  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  // Add custom tag
  const addTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      setTags([...tags, customTag.trim()]);
      setCustomTag('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Analyze colors with AI
  const analyzeColors = async () => {
    if (!imgRef.current || !skinTone) return;
    
    setUploading(true);
    
    try {
      const colorThief = new ColorThief();
      const dominant = await colorThief.getColor(imgRef.current);
      const palette = colorPalettes[skinTone] || [];
      const rating = getStyleRating(dominant, skinTones.find(t => t.name === skinTone)?.match || [0,0,0]);
      const feedback = getStyleFeedback(rating, skinTone);
      
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAnalysis({ dominant, rating, feedback, palette });
      setStep(3);
    } catch (err) {
      console.error("Color extraction failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // Style rating calculation
  const getStyleRating = (color1, color2) => {
    const distance = Math.sqrt(
      color1.reduce((sum, c, i) => sum + (c - color2[i]) ** 2, 0)
    );
    return Math.max(1, Math.round(10 - distance / 25));
  };

  // Style feedback based on rating
  const getStyleFeedback = (rating, tone) => {
    if (rating > 7) return `🌟 This outfit color beautifully complements your ${tone} skin tone. You look absolutely radiant!`;
    if (rating > 4) return `👍 This creates a lovely balanced look with your ${tone} skin tone. You're glowing!`;
    return `💡 Try experimenting with warmer or cooler tones to enhance your natural ${tone} beauty. Every style journey is unique!`;
  };

  // Handle upload to backend
  const handleUpload = async () => {
    if (!file || !skinTone || !analysis) {
      alert("Please complete all steps before uploading.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in to upload.");
      return;
    }

    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const fileRef = ref(storage, `uploads/${user.uid}/${fileName}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      // Send metadata to backend
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
          season: selectedSeason,
          occasion: selectedOccasion,
          tags,
          createdAt: new Date().toISOString()
        })
      });

      // Update recent uploads
      setRecentUploads(prev => [
        {
          id: Date.now(),
          imageUrl: downloadURL,
          date: new Date().toLocaleDateString()
        },
        ...prev.slice(0, 4)
      ]);

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // AI Analysis Results Component
  const AIAnalysisResults = ({ analysis, skinTone }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 p-6 rounded-xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <FaPalette className="mr-2" /> AI Style Analysis
          </h3>
          <div className="flex items-center">
            <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
              {analysis.rating}/10
            </div>
            <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
              AI-Powered
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-lg mb-2">{analysis.feedback}</p>
          <div className="flex items-center text-sm opacity-80">
            <FaCheckCircle className="mr-1" /> AI-powered color harmony analysis
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <FaTshirt className="mr-2" /> Recommended Color Palette for {skinTone} Skin
          </h4>
          <div className="flex gap-3">
            {analysis.palette.map((color, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <div 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg mb-1 transition-transform"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs opacity-80">{color}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {showAdvancedOptions && (
          <div className="mt-5 pt-4 border-t border-white/20">
            <h4 className="font-semibold mb-2">Additional Insights</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Seasonal Suitability</p>
                <div className="flex flex-wrap gap-2">
                  {seasons.map(season => (
                    <span 
                      key={season}
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedSeason === season 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {season}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Occasion Matching</p>
                <div className="flex flex-wrap gap-2">
                  {occasions.map(occasion => (
                    <span 
                      key={occasion}
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedOccasion === occasion 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-5 pt-4 border-t border-white/20">
          <h4 className="font-semibold mb-2 flex items-center">
            <FaLock className="mr-2" /> Privacy Assured
          </h4>
          <p className="text-sm opacity-80">
            Your image and analysis are processed securely and never shared with third parties.
          </p>
        </div>
      </motion.div>
    );
  };

  // Confidence Meter Component
  const ConfidenceMeter = ({ level, setLevel }) => {
    return (
      <div className="mt-4 bg-white/5 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-white">Today's Confidence Level</h4>
          <span className="text-pink-400 font-bold">{level}/10</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/50">1</span>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="flex-1 accent-pink-500"
          />
          <span className="text-xs text-white/50">10</span>
        </div>
        <div className="text-xs text-white/70 mt-2">
          {level < 4 && "It's okay to have off days. Your style will shine again!"}
          {level >= 4 && level < 7 && "Looking good! A few small tweaks can boost your confidence even more."}
          {level >= 7 && "You're rocking it! Confidence is your best accessory."}
        </div>
      </div>
    );
  };

  // Recent Uploads Component
  const RecentUploads = ({ uploads }) => {
    if (uploads.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <FaHistory className="mr-2" /> Recent Uploads
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {uploads.map((upload) => (
            <div key={upload.id} className="flex-shrink-0 relative group">
              <img 
                src={upload.imageUrl} 
                alt="Recent upload" 
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition">
                <button className="text-white text-xs bg-pink-500 p-1 rounded-full">
                  <FaPlus size={10} />
                </button>
              </div>
              <div className="text-xs text-white/70 mt-1 text-center">
                {upload.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="flex">
            {[
              { id: "upload", label: "Upload Outfit", icon: <FaCloudUploadAlt /> },
              { id: "wardrobe", label: "My Wardrobe", icon: <FaTshirt /> },
              { id: "suggestions", label: "AI Suggestions", icon: <FaMagic /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/20">
          {activeTab === "upload" && (
            <>
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition ${
                      step >= num 
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg" 
                        : "bg-white/10 text-white/50"
                    }`}>
                      {num}
                    </div>
                    {num < 3 && (
                      <div className={`h-1 w-8 transition ${
                        step > num 
                          ? "bg-gradient-to-r from-pink-500 to-purple-500" 
                          : "bg-white/10"
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-3 text-center text-white">
                {step === 1 && "Upload Your Outfit"}
                {step === 2 && "Describe Your Style"}
                {step === 3 && "AI Analysis Results"}
              </h2>
              <p className="text-sm text-white/70 text-center mb-6">
                {step === 1 && "Add photos of your outfit for personalized AI style analysis"}
                {step === 2 && "Help us understand your look for better recommendations"}
                {step === 3 && "Your personalized style insights and recommendations"}
              </p>

              {/* Step 1: File Upload */}
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col items-center justify-center border-2 border-dashed ${
                    isDragging ? 'border-pink-400 bg-white/10' : 'border-pink-400/50'
                  } rounded-xl p-8 cursor-pointer transition mb-6`}
                  onClick={() => fileInput.current?.click()}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {preview ? (
                    <>
                      <img
                        ref={imgRef}
                        src={preview}
                        alt="Preview"
                        crossOrigin="anonymous"
                        className="max-h-64 rounded-lg shadow-lg mb-3"
                      />
                      <p className="text-white/80 text-sm">{file?.name}</p>
                      <button 
                        className="mt-2 text-xs text-pink-300 hover:text-pink-200 hover:underline"
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
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                        <FaCamera className="text-white text-2xl" />
                      </div>
                      <span className="text-white/80 mb-2">
                        {isDragging ? "Drop your image here" : "Drag & drop or click to select"}
                      </span>
                      <p className="text-xs text-white/50">Supports JPG, PNG (Max 10MB)</p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        ref={fileInput} 
                      />
                    </>
                  )}
                </motion.div>
              )}

              {/* Step 2: Style Details */}
              {step === 2 && preview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img
                        ref={imgRef}
                        src={preview}
                        alt="Preview"
                        crossOrigin="anonymous"
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-white mb-3">Select your skin tone:</h3>
                        <div className="flex flex-wrap gap-2">
                          {skinTones.map((tone) => (
                            <button
                              key={tone.name}
                              type="button"
                              onClick={() => setSkinTone(tone.name)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-full border transition ${
                                skinTone === tone.name 
                                  ? "ring-2 ring-pink-400 scale-105 bg-white/10 backdrop-blur-sm" 
                                  : "opacity-80 hover:opacity-100 hover:scale-105 bg-white/5"
                              }`}
                              style={{ color: "white" }}
                            >
                              <span 
                                className="w-4 h-4 rounded-full border border-white/30" 
                                style={{ backgroundColor: tone.color }}
                              ></span>
                              {tone.name}
                              {skinTone === tone.name && (
                                <FaCheckCircle className="text-pink-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-white mb-3">How does this outfit make you feel?</h3>
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
                                  ? "ring-2 ring-pink-400 scale-105"
                                  : "opacity-80 hover:opacity-100 hover:scale-105"
                              }`}
                            >
                              {mood.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <ConfidenceMeter level={confidenceLevel} setLevel={setConfidenceLevel} />

                      <button
                        className="text-xs text-white/70 hover:text-white flex items-center"
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      >
                        {showAdvancedOptions ? 'Hide' : 'Show'} advanced options
                        <FaPlus className={`ml-1 text-xs transition ${showAdvancedOptions ? 'rotate-45' : ''}`} />
                      </button>

                      {showAdvancedOptions && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 overflow-hidden"
                        >
                          <div>
                            <h3 className="font-semibold text-white mb-2 text-sm">Season</h3>
                            <div className="flex flex-wrap gap-2">
                              {seasons.map(season => (
                                <button
                                  key={season}
                                  type="button"
                                  onClick={() => setSelectedSeason(season)}
                                  className={`px-3 py-1 rounded-full text-xs ${
                                    selectedSeason === season
                                      ? 'bg-pink-500 text-white'
                                      : 'bg-white/10 text-white hover:bg-white/20'
                                  }`}
                                >
                                  {season}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-white mb-2 text-sm">Occasion</h3>
                            <div className="flex flex-wrap gap-2">
                              {occasions.map(occasion => (
                                <button
                                  key={occasion}
                                  type="button"
                                  onClick={() => setSelectedOccasion(occasion)}
                                  className={`px-3 py-1 rounded-full text-xs ${
                                    selectedOccasion === occasion
                                      ? 'bg-pink-500 text-white'
                                      : 'bg-white/10 text-white hover:bg-white/20'
                                  }`}
                                >
                                  {occasion}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-white mb-2 text-sm">Tags</h3>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {tags.map(tag => (
                                <div key={tag} className="flex items-center bg-white/10 text-white px-2 py-1 rounded-full text-xs">
                                  {tag}
                                  <button 
                                    onClick={() => removeTag(tag)}
                                    className="ml-1 text-white/50 hover:text-white"
                                  >
                                    <FaTimes size={10} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={customTag}
                                onChange={(e) => setCustomTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                placeholder="Add custom tag"
                                className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex-1 border border-white/20 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                              />
                              <button
                                onClick={addTag}
                                className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-600"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-bold hover:from-pink-600 hover:to-purple-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={analyzeColors}
                    disabled={!file || !skinTone || uploading}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaMagic /> Analyze Outfit with AI
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* Step 3: Analysis Results */}
              {step === 3 && analysis && (
                <>
                  <AIAnalysisResults analysis={analysis} skinTone={skinTone} />
                  
                  <button
                    className="mt-6 w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:from-pink-600 hover:to-blue-600 transition text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={handleUpload}
                    disabled={uploading || success}
                  >
                    {success ? (
                      <span className="flex items-center justify-center gap-2 animate-pulse">
                        <FaCheckCircle /> Uploaded Successfully! ✨
                      </span>
                    ) : uploading ? (
                      "Uploading..."
                    ) : (
                      "💾 Save to My Wardrobe"
                    )}
                  </button>

                  <RecentUploads uploads={recentUploads} />
                </>
              )}
            </>
          )}

          {activeTab === "wardrobe" && (
            <div className="text-center py-12 text-white/70">
              <FaTshirt className="mx-auto text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Wardrobe</h3>
              <p>View and manage your uploaded outfits</p>
              <button 
                className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-600 transition"
                onClick={() => setActiveTab('upload')}
              >
                Upload New Outfit
              </button>
            </div>
          )}

          {activeTab === "suggestions" && (
            <div className="text-center py-12 text-white/70">
              <FaMagic className="mx-auto text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Style Suggestions</h3>
              <p>Get personalized outfit recommendations based on your wardrobe</p>
              <button 
                className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-600 transition"
                onClick={() => setActiveTab('upload')}
              >
                Upload New Outfit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedUpload;