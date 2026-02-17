import { useState } from "react";
import api from "../services/api";

export default function ReviewSection({ resourceId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    await api.post("/reviews/", null, {
      params: { resource_id: resourceId, rating, comment }
    });
    alert("Review submitted!");
  };

  return (
    <div className="card">
      <h3>Add Review</h3>
      <input type="number" min="1" max="5"
        onChange={(e) => setRating(e.target.value)} />
      <textarea placeholder="Write review"
        onChange={(e) => setComment(e.target.value)} />
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}
