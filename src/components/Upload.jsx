import React, { useState, useRef } from "react";
import { CloudArrowUpIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../firebase"; // Adjust this path based on your structure

const moodOptions = [
  { label: "😊 Confident", bg: "bg-blue-100", text: "text-blue-700" },
  { label: "🌧️ Cozy", bg: "bg-yellow-100", text: "text-yellow-700" },
  { label: "🌞 Bright", bg: "bg-yellow-200", text: "text-yellow-800" },
  { label: "❄️ Cool", bg: "bg-blue-200", text: "text-blue-800" },
  { label: "🧘 Calm", bg: "bg-green-100", text: "text-green-700" }
];

const skinTones = [
  { name: "Fair", color: "#fbeee6" },
  { name: "Light", color: "#f3d7b6" },
  { name: "Medium", color: "#e0ac69" },
  { name: "Olive", color: "#c68642" },
  { name: "Brown", color: "#8d5524" },
  { name: "Dark", color: "#5d3a1a" }
];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [skinTone, setSkinTone] = useState("");
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
    setStep(2);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    setFile(dropped);
    setPreview(dropped ? URL.createObjectURL(dropped) : null);
    setStep(2);
  };

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood)
        ? prev.filter((m) => m !== mood)
        : [...prev, mood]
    );
  };

  const handleUpload = async () => {
    if (!file || !skinTone) {
      alert("Please select an outfit image and your skin tone before uploading.");
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "outfits"), {
        imageUrl: downloadURL,
        skinTone,
        moods: selectedMoods.map(m => m.label),
        createdAt: Timestamp.now()
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFile(null);
        setPreview(null);
        setSelectedMoods([]);
        setSkinTone("");
        setStep(1);
        if (fileInput.current) fileInput.current.value = "";
      }, 1800);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] flex items-center justify-center transition-colors">
      <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-xl max-w-lg w-full">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((num, i) => (
            <>
              <div key={num} className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step >= num ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-500"}`}>{num}</div>
              {i < 2 && <div className={`h-1 w-8 ${step > num ? "bg-pink-400" : "bg-gray-200"}`}></div>}
            </>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 text-center">
          Upload Your Outfit
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
          <span className="font-medium">Your photos are private.</span> Only you can access and delete them.
        </p>

        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed border-pink-400 rounded-lg p-6 cursor-pointer transition mb-4
            ${preview ? "bg-pink-50 dark:bg-gray-700" : "hover:bg-pink-50 dark:hover:bg-gray-700"}`}
          onClick={() => fileInput.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="max-h-48 rounded shadow mb-2 animate-fade-in" />
              <p className="text-gray-600 dark:text-gray-300">{file?.name}</p>
              <button
                className="mt-2 text-xs text-pink-500 hover:underline"
                onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); setStep(1); }}
              >
                Remove & choose another
              </button>
            </>
          ) : (
            <>
              <CloudArrowUpIcon className="w-12 h-12 text-pink-400 mb-2 animate-bounce" />
              <span className="text-gray-500 dark:text-gray-400 mb-2">
                Drag & drop or click to select
              </span>
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

        {/* Step 2: Skin Tone */}
        {step >= 2 && (
          <div className="mt-6 animate-fade-in">
            <p className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Select your skin tone:
            </p>
            <div className="flex flex-wrap gap-2">
              {skinTones.map((tone) => (
                <button
                  key={tone.name}
                  type="button"
                  onClick={() => setSkinTone(tone.name)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border transition
                    ${skinTone === tone.name ? "ring-2 ring-pink-400 scale-105" : "opacity-80 hover:opacity-100"}`}
                  style={{ background: tone.color, color: "#222" }}
                >
                  <span className="w-4 h-4 rounded-full border" style={{ background: tone.color, borderColor: "#bbb" }}></span>
                  {tone.name}
                  {skinTone === tone.name && <CheckCircleIcon className="w-4 h-4 text-pink-500" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Mood */}
        {step >= 2 && (
          <div className="mt-6 animate-fade-in">
            <p className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              How do you feel in this outfit?
            </p>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  type="button"
                  onClick={() => toggleMood(mood)}
                  className={`px-2 py-1 rounded-full text-xs font-medium border transition
                    ${mood.bg} ${mood.text}
                    ${selectedMoods.includes(mood)
                      ? "ring-2 ring-pink-400 scale-105"
                      : "opacity-80 hover:opacity-100"}`}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          className="mt-8 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-500 hover:to-blue-500 transition text-lg shadow disabled:opacity-60"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : success ? (
            <span className="flex items-center justify-center gap-2 animate-pulse">
              <CheckCircleIcon className="w-6 h-6 text-white" /> Uploaded!
            </span>
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
}
