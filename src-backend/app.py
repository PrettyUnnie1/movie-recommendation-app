from flask import Flask, request, jsonify
from predict import load_model_and_predict
from flask_cors import CORS
from preprocess import encode_user_input
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        raw_data = request.get_json()
        data = encode_user_input(raw_data)
        
        print(f"[📩 Received]: {raw_data}")  # ✅ In raw input
        result = load_model_and_predict(data)
        print(f"[✅ Predicted Score]: {result['score']}")  # ✅ In predicted result
        
        return jsonify(result), 200

    except Exception as e:
        print(f"[❌ Error]: {e}")  # ✅ In lỗi nếu có
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
