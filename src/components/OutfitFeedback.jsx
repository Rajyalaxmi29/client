import React, { useState } from "react";

export default function OutfitFeedback({ imageUrl, skinTone, onSubmit }) {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ imageUrl, skinTone, rating, comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>How do you feel in this outfit?</p>
      <input
        type="range"
        min="1"
        max="5"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      />
      <span>{rating} / 5</span>
      <br />
      <textarea
        placeholder="Why did you give this rating?"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
