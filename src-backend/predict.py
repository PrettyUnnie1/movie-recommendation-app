import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model('../data/deepfm_model.keras')

def load_model_and_predict(user_input):
    
    features = [
        np.array([[user_input['age']]]),
        np.array([[user_input['gender']]]),
        np.array([[user_input['occupation']]]),
        np.array([[user_input['genre']]]),
    ]
    preds = model.predict(features)
    return {"score": float(preds[0][0])}