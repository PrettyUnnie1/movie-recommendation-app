import os
print(f"[📂 Using]: {__file__}")

import tensorflow as tf
import numpy as np
import pandas as pd

# Load model đã huấn luyện
model = tf.keras.models.load_model('C:/Thesis/Sample Project/Data/deepfm_model.keras')
print("[🧠 Model Input Names]:", model.input_names)
# Load danh sách phim
movies_df = pd.read_csv('C:/Thesis/Sample Project/Data/Dataset/movies.dat', sep='::', engine='python',
                        names=["item_id", "title", "genres"], encoding='latin-1')
movies_df["genre"] = movies_df["genres"].apply(lambda x: x.split("|")[0])
genre_to_index = {genre: idx for idx, genre in enumerate(sorted(movies_df["genre"].unique()))}
movies_df["genre"] = movies_df["genre"].map(genre_to_index)
# ⚠️ Thêm dòng này để tránh lỗi embedding index out of range
movies_df = movies_df[movies_df["item_id"] < 3706]
movies_df = movies_df[["item_id", "genre", "title"]].drop_duplicates()

def recommend_movies(user_profile, top_n=10):
    # Tạo batch input
    n_items = len(movies_df)
    user_batch = {
        "gender":     np.array([user_profile["gender"]] * n_items),
        "age":        np.array([user_profile["age"]] * n_items),
        "occupation": np.array([user_profile["occupation"]] * n_items),
        "item_id":    movies_df["item_id"].values,
        "genre":      movies_df["genre"].values,
    }

    # Dự đoán
    preds = model.predict(user_batch, verbose=0)
    movies_df["score"] = preds.flatten()

    # Trả top-N
    top_movies = movies_df.sort_values("score", ascending=False).head(top_n)
    return top_movies[["title", "score"]].values.tolist()
