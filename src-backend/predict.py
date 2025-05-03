import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model('../data/deepfm_model.keras')
print(model.input_names)
def load_model_and_predict(data):
    
    features = {
        "user_input": np.array([[data['user_id']]]),
        "item_input": np.array([[data['item_id']]]),
        "gender":     np.array([[data['gender']]]),
        "age":        np.array([[data['age']]]),
        "occupation": np.array([[data['occupation']]]),
        "genre":      np.array([[data['genre']]])
    }
    preds = model.predict(features)
    return {"score": float(preds[0][0])}