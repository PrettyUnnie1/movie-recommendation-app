import React, { useState } from 'react';
import axios from 'axios';

function RecommendForm() {
  const [gender, setGender] = useState('M');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/recommend', {
        gender,
        age: Number(age),
        occupation: Number(occupation),
      });

      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error('[❌ Network Error]:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
        <br /><br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Occupation:
          <input type="number" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
        </label>
        <br /><br />
        <button type="submit">Get Recommendations</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recommendations.length > 0 && (
        <div>
          <h3>Top Recommendations:</h3>
          <ul>
            {recommendations.map(([item, score], idx) => (
              <li key={idx}>
                {item} — Score: {score.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecommendForm;
