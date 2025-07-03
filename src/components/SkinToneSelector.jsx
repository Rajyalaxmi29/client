import React, { useState } from "react";

const skinTones = [
  "#fbe7d3", // light
  "#f3c6a9",
  "#e6aa7a",
  "#b97c50",
  "#8d5524"  // dark
];

export default function SkinToneSelector({ onSelect }) {
  const [selectedTone, setSelectedTone] = useState(null);

  return (
    <div>
      <p>Select a skin tone:</p>
      <div style={{ display: "flex", gap: 10 }}>
        {skinTones.map((tone, idx) => (
          <button
            key={idx}
            style={{
              background: tone,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: selectedTone === tone ? "2px solid black" : "1px solid #ccc"
            }}
            onClick={() => {
              setSelectedTone(tone);
              onSelect && onSelect(tone);
            }}
          />
        ))}
      </div>
    </div>
  );
}
