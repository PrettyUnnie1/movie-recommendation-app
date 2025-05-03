from flask import Flask, request, jsonify
from predict import load_model_and_predict

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    reccommendations = load_model_and_predict(data)
    return jsonify(reccommendations)

if __name__ == "__main__":
    app.run(debug=True)
