import React from "react";

const uploads = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    date: "2025-07-02",
    feedback: "Great color match for your warm skin tone!",
    colors: ["#F87171", "#FBBF24", "#34D399"],
    moods: [
      { label: "😊 Confident", bg: "bg-blue-100", text: "text-blue-700" },
      { label: "🌧️ Cozy", bg: "bg-yellow-100", text: "text-yellow-700" }
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80",
    date: "2025-06-28",
    feedback: "Try warmer shades like peach or coral for a fresh look.",
    colors: ["#FBBF24", "#F472B6", "#3B82F6"],
    moods: [
      { label: "🌞 Bright", bg: "bg-yellow-100", text: "text-yellow-700" }
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80",
    date: "2025-06-20",
    feedback: "Cool tones suit you well, especially blues and grays.",
    colors: ["#3B82F6", "#6B7280", "#9CA3AF"],
    moods: [
      { label: "❄️ Cool", bg: "bg-blue-100", text: "text-blue-700" },
      { label: "🧘 Calm", bg: "bg-green-100", text: "text-green-700" }
    ]
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Your Style Dashboard
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center transition-colors"
            >
              <img
                src={upload.image}
                alt="Outfit"
                className="w-40 h-40 object-cover rounded mb-4 border-2 border-gray-200 dark:border-gray-700"
              />
              <div className="flex space-x-2 mb-2">
                {upload.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {upload.moods && upload.moods.map((mood, idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${mood.bg} ${mood.text}`}
                  >
                    {mood.label}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 text-center">
                {upload.feedback}
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">{upload.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
