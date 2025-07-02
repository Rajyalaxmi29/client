import React, { useState, useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

const moodOptions = [
  { label: "😊 Confident", bg: "bg-blue-100", text: "text-blue-700" },
  { label: "🌧️ Cozy", bg: "bg-yellow-100", text: "text-yellow-700" },
  { label: "🌞 Bright", bg: "bg-yellow-200", text: "text-yellow-800" },
  { label: "❄️ Cool", bg: "bg-blue-200", text: "text-blue-800" },
  { label: "🧘 Calm", bg: "bg-green-100", text: "text-green-700" }
];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const fileInput = useRef();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    setFile(dropped);
    setPreview(dropped ? URL.createObjectURL(dropped) : null);
  };

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood)
        ? prev.filter((m) => m !== mood)
        : [...prev, mood]
    );
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file before uploading.");
    alert(
      `Uploading: ${file.name}\nMoods: ${selectedMoods
        .map((m) => m.label)
        .join(", ")}`
    );
    setFile(null);
    setPreview(null);
    setSelectedMoods([]);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Upload Your Outfit
        </h2>
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-pink-400 rounded-lg p-6 cursor-pointer hover:bg-pink-50 dark:hover:bg-gray-700 transition mb-4"
          onClick={() => fileInput.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CloudArrowUpIcon className="w-12 h-12 text-pink-400 mb-2" />
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
        </div>
        {preview && (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded shadow mb-2"
            />
            <p className="text-gray-600 dark:text-gray-300">{file?.name}</p>
          </div>
        )}
        <div className="mt-6">
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
                  ${
                    selectedMoods.includes(mood)
                      ? "ring-2 ring-pink-400 scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
        <button
          className="mt-8 w-full bg-pink-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
