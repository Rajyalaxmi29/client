import React, { useState, useRef, useEffect } from "react";
import { CloudArrowUpIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ColorThief from "color-thief-browser";

// Mood and Skin Tone Options
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

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [skinTone, setSkinTone] = useState("");
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const fileInput = useRef();
  const imgRef = useRef();

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
    if (rating > 7) return `🌟 This outfit color beautifully complements your ${tone} skin tone. Great harmony!`;
    if (rating > 4) return `👍 Looks decent with your ${tone} skin tone. A balanced look.`;
    return `🤔 This color contrasts your ${tone} tone strongly. Try softer or brighter shades for better harmony.`;
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

      await addDoc(collection(db, "outfits"), {
        uid: user.uid,
        imageUrl: downloadURL,
        skinTone,
        moods: selectedMoods.map((m) => m.label),
        colorRating: analysis.rating,
        feedback: analysis.feedback,
        suggestedPalette: analysis.palette,
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFile(null);
        setPreview(null);
        setSelectedMoods([]);
        setSkinTone("");
        setStep(1);
        setAnalysis(null);
        if (fileInput.current) fileInput.current.value = "";
      }, 1800);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] flex items-center justify-center transition-colors">
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl max-w-lg w-full">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step >= num ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-500"}`}>{num}</div>
              {num < 3 && <div className={`h-1 w-8 ${step > num ? "bg-pink-400" : "bg-gray-200"}`}></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Upload UI */}
        <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Upload Your Outfit</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          <span className="font-medium">AI Private Analysis</span> – nothing is stored until you upload.
        </p>

        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed border-pink-400 rounded-lg p-6 cursor-pointer transition mb-4
          ${preview ? "bg-pink-50" : "hover:bg-pink-50"}`}
          onClick={() => fileInput.current.click()}
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
              <button className="mt-2 text-xs text-pink-500 hover:underline" onClick={() => {
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

        {/* Step 2: Skin Tone & Mood */}
        {step >= 2 && (
          <>
            <div className="mt-4">
              <p className="mb-1 font-semibold text-gray-700">Select your skin tone:</p>
              <div className="flex flex-wrap gap-2">
                {skinTones.map((tone) => (
                  <button
                    key={tone.name}
                    type="button"
                    onClick={() => setSkinTone(tone.name)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition ${skinTone === tone.name ? "ring-2 ring-pink-400 scale-105" : "opacity-80 hover:opacity-100"}`}
                    style={{ background: tone.color, color: "#222" }}
                  >
                    <span className="w-4 h-4 rounded-full border" style={{ background: tone.color, borderColor: "#bbb" }}></span>
                    {tone.name}
                    {skinTone === tone.name && <CheckCircleIcon className="w-4 h-4 text-pink-500" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-1 font-semibold text-gray-700">How do you feel in this outfit?</p>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => toggleMood(mood)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border transition ${mood.bg} ${mood.text} ${selectedMoods.includes(mood) ? "ring-2 ring-pink-400 scale-105" : "opacity-80 hover:opacity-100"}`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="mt-6 w-full bg-pink-400 text-white py-2 rounded-full font-semibold hover:bg-pink-500 transition"
              onClick={analyzeColors}
              disabled={!file || !skinTone}
            >
              Analyze Outfit with AI
            </button>
          </>
        )}

        {/* Step 3: AI Feedback */}
        {step === 3 && analysis && (
          <div className="mt-6 p-4 border rounded-lg bg-white text-gray-700 animate-fade-in">
            <p className="font-semibold mb-2">🎨 AI Style Rating: <span className="text-pink-500">{analysis.rating}/10</span></p>
            <p className="mb-3">{analysis.feedback}</p>
            <p className="font-semibold mb-1">Best Palette for {skinTone} skin:</p>
            <div className="flex gap-2 mt-1">
              {analysis.palette.map((color, i) => (
                <div key={i} className="w-6 h-6 rounded-full border" style={{ background: color }}></div>
              ))}
            </div>
          </div>
        )}

        {/* Final Upload */}
        <button
          className="mt-8 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-500 hover:to-blue-500 transition text-lg shadow disabled:opacity-50"
          onClick={handleUpload}
          disabled={uploading || !analysis}
        >
          {success ? (
            <span className="flex items-center justify-center gap-2 animate-pulse">
              <CheckCircleIcon className="w-6 h-6 text-white" /> Uploaded!
            </span>
          ) : uploading ? "Uploading..." : "Upload to Save"}
        </button>
      </div>
    </div>
  );
}
