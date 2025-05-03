import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/recommend", {
      age: 3,
      gender: 1,
      occupation: 4,
      genre: 5
    });
    setResult(res.data.score);
  };
zzfgasf
  return (
    <div>
      <h2>Movie Recommender</h2>
      <button onClick={handleSubmit}>Get Recommendation</button>
      {result && <p>Predicted Score: {result}</p>}
    </div>
  );
}

export default App;
