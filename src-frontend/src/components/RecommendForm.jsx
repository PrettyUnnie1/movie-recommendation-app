import React, { useState } from 'react';
import axios from 'axios';

function RecommendForm() {
  const [gender, setGender] = useState('M');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  // Cập nhật hàm getPosterURL
  const getPosterURL = async (title) => {
    try {
      // Loại bỏ năm khỏi tiêu đề phim, ví dụ: "Inception (2010)" => "Inception"
      const cleanedTitle = title.replace(/\s*\(\d{4}\)$/, '');
      
      const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'c24381c0a201e1fe30d94c02463bc6ca',
          query: cleanedTitle
        }
      });

      const posterPath = res.data.results[0]?.poster_path;
      return posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : null;
    } catch (err) {
      console.error(`[❌ TMDB Error]: Failed to get poster for ${title}`, err);
      return null;
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await axios.post('http://localhost:5000/recommend', {
        gender,
        age: Number(age),
        occupation: Number(occupation),
      });
  
      const rawRecommendations = res.data.recommendations;
  
      const enriched = await Promise.all(
        rawRecommendations.map(async ([title, score]) => {
          const poster = await getPosterURL(title);
          return { title, score, poster };
        })
      );
  
      setRecommendations(enriched);
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
        <label>Age:</label>
          <select value={age} onChange={(e) => setAge(Number(e.target.value))}>
            <option value="">-- Select Age Group --</option>
            <option value={1}>Under 18</option>
            <option value={18}>18–24</option>
            <option value={25}>25–34</option>
            <option value={35}>35–44</option>
            <option value={45}>45–49</option>
            <option value={50}>50–55</option>
            <option value={56}>56+</option>
          </select>
        <br /><br />
        <label>Occupation:</label>
          <select value={occupation} onChange={(e) => setOccupation(Number(e.target.value))}>
            <option value="">-- Select Occupation --</option>
            <option value={0}>Other / Not Specified</option>
            <option value={1}>Academic / Educator</option>
            <option value={2}>Artist</option>
            <option value={3}>Clerical / Admin</option>
            <option value={4}>College / Grad Student</option>
            <option value={5}>Customer Service</option>
            <option value={6}>Doctor / Healthcare</option>
            <option value={7}>Executive / Managerial</option>
            <option value={8}>Farmer</option>
            <option value={9}>Homemaker</option>
            <option value={10}>K–12 Student</option>
            <option value={11}>Lawyer</option>
            <option value={12}>Programmer</option>
            <option value={13}>Retired</option>
            <option value={14}>Sales / Marketing</option>
            <option value={15}>Scientist</option>
            <option value={16}>Self-Employed</option>
            <option value={17}>Technician / Engineer</option>
            <option value={18}>Tradesman / Craftsman</option>
            <option value={19}>Unemployed</option>
            <option value={20}>Writer</option>
          </select>
        <br /><br />
        <button type="submit">Get Recommendations</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recommendations.length > 0 && (
          <div>
            <h3>Top Recommendations:</h3>
            <ul className="recommendation-list">
              {recommendations.map(({ title, score, poster }, idx) => (
                <li key={idx} className="recommendation-item">
                  {poster && <img src={poster} alt={title} className="poster" />}
                  <div>
                    <strong>{title}</strong><br />
                    Score: {score.toFixed(4)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default RecommendForm;
