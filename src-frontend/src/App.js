import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      const res = await axios.post("http://localhost:5000/recommend", {
        user_id: 10,
        item_id: 50,
        gender: "M",
        age: 25,
        occupation: 3,
        genre: "Action"
      });
      console.log("[✅ Backend response]:", res.data);  // ✅ In log rõ ràng
      setResult(res.data.score);  // ✅ Hiển thị trên UI
    } catch (err) {
      console.error("[❌ Network Error]:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎬 Movie Recommender</h2>
      <button onClick={handleSubmit}>Get Recommendation</button>
      {result && <p>Predicted Score: <strong>{result.toFixed(4)}</strong></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
