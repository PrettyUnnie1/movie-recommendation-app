from flask import Flask, request, jsonify
from flask_cors import CORS
from preprocess import encode_user_profile
from predict import recommend_movies

app = Flask(__name__)
CORS(app)

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        raw_data = request.get_json()
        user_profile = encode_user_profile(raw_data)
        print("[🐾 Encoded user profile]:", user_profile)
        recommendations = recommend_movies(user_profile)
        print("[🎬 Top recommendations]:", recommendations)
        return jsonify({"recommendations": recommendations}), 200
    except Exception as e:
        print("[❌ Backend error]:", e)
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
