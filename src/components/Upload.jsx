// Upload.jsx
import React, { useState, useRef } from "react";
import { CloudArrowUpIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
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

const getDynamicPalette = (dominant, skinRGB) => {
  const shades = [
    `rgb(${dominant[0] + 30}, ${dominant[1]}, ${dominant[2]})`,
    `rgb(${Math.max(0, dominant[0] - 20)}, ${Math.max(0, dominant[1] - 20)}, ${Math.max(0, dominant[2] - 20)})`,
    `rgb(${skinRGB[0]}, ${dominant[1]}, ${skinRGB[2]})`
  ];
  return shades;
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

  const getStyleRating = (color1, color2) => {
    const distance = Math.sqrt(
      color1.reduce((sum, c, i) => sum + (c - color2[i]) ** 2, 0)
    );
    return Math.max(1, Math.min(10, Math.round(10 - distance / 25)));
  };

  const getStyleFeedback = (rating, tone) => {
    if (rating > 7) return `🌟 This outfit color beautifully complements your ${tone} skin tone. Great harmony!`;
    if (rating > 4) return `👍 Looks decent with your ${tone} skin tone. A balanced look.`;
    return `🤔 This color contrasts your ${tone} tone strongly. Try softer or brighter shades for better harmony.`;
  };

  const analyzeColors = async () => {
    if (!imgRef.current || !skinTone) return;
    const colorThief = new ColorThief();

    try {
      const dominant = await colorThief.getColor(imgRef.current);
      const skinMatch = skinTones.find(t => t.name === skinTone)?.match || [0, 0, 0];
      const rating = getStyleRating(dominant, skinMatch);
      const feedback = getStyleFeedback(rating, skinTone);
      const palette = getDynamicPalette(dominant, skinMatch);

      setAnalysis({ dominant, rating, feedback, palette });
      setStep(3);
    } catch (err) {
      console.error("Color analysis failed:", err);
    }
  };

  const handleUpload = async () => {
    if (!file || !skinTone || !analysis) {
      alert("Please select an image, skin tone and run analysis first.");
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
        palette: analysis.palette,
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
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] p-4">
      <div className="bg-white/90 p-6 rounded-2xl shadow-xl max-w-lg w-full">
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step >= num ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-500"}`}>{num}</div>
              {num < 3 && <div className={`h-1 w-8 ${step > num ? "bg-pink-400" : "bg-gray-200"}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <h2 className="text-xl font-bold text-center mb-2">Upload Your Outfit</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Private AI-based style feedback. Works with hand or face.</p>

        <div
          className="border-2 border-dashed border-pink-400 p-6 rounded-xl mb-4 cursor-pointer"
          onClick={() => fileInput.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {preview ? (
            <div className="text-center">
              <img ref={imgRef} src={preview} alt="Preview" crossOrigin="anonymous" className="max-h-48 mx-auto rounded mb-2" />
              <p className="text-sm text-gray-600">{file?.name}</p>
              <button onClick={() => { setFile(null); setPreview(null); setAnalysis(null); setStep(1); }} className="text-xs text-pink-500 mt-1 hover:underline">Remove</button>
            </div>
          ) : (
            <div className="text-center">
              <CloudArrowUpIcon className="w-10 h-10 text-pink-400 mx-auto mb-2 animate-bounce" />
              <p className="text-sm text-gray-500">Click or drag to upload outfit</p>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInput} />
            </div>
          )}
        </div>

        {step >= 2 && (
          <>
            <div className="mb-4">
              <p className="font-medium text-gray-700">Select your skin tone:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {skinTones.map((tone) => (
                  <button
                    key={tone.name}
                    onClick={() => setSkinTone(tone.name)}
                    className={`px-3 py-1 rounded-full border ${skinTone === tone.name ? "ring-2 ring-pink-400" : "opacity-80"} transition`}
                    style={{ background: tone.color, color: "#222" }}
                  >
                    {tone.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="font-medium text-gray-700">How do you feel in this outfit?</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => toggleMood(mood)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${mood.bg} ${mood.text} ${selectedMoods.includes(mood) ? "ring-2 ring-pink-400 scale-105" : ""}`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition" onClick={analyzeColors}>
              Analyze with AI
            </button>
          </>
        )}

        {step === 3 && analysis && (
          <div className="mt-4 bg-white border rounded-lg p-4 text-gray-700">
            <p className="mb-2 font-semibold">🎯 Style Rating: <span className="text-pink-500">{analysis.rating}/10</span></p>
            <p className="mb-3">{analysis.feedback}</p>
            <p className="mb-1 font-medium">Best colors for {skinTone} skin:</p>
            <div className="flex gap-2">
              {analysis.palette.map((color, i) => (
                <div key={i} className="w-6 h-6 rounded-full border shadow" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
        )}

        <button
          className="mt-6 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-pink-500 hover:to-blue-500 disabled:opacity-50"
          onClick={handleUpload}
          disabled={uploading || !analysis}
        >
          {success ? <span className="flex items-center justify-center gap-2 animate-pulse"><CheckCircleIcon className="w-6 h-6" /> Uploaded!</span> : uploading ? "Uploading..." : "Upload to Save"}
        </button>
      </div>
    </div>
  );
}
