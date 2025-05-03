# preprocess.py

def encode_user_input(raw_input):
    """
    Convert raw user input (text or number) to encoded format expected by model
    """
    gender_map = {'F': 0, 'M': 1}
    age_map = {1: 0, 18: 1, 25: 2, 35: 3, 45: 4, 50: 5, 56: 6}
    occupation_map = {
        0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
        10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16,
        17: 17, 18: 18, 19: 19, 20: 20
    }
    genre_map = {
        'Action': 0, 'Adventure': 1, 'Animation': 2, "Children's": 3,
        'Comedy': 4, 'Crime': 5, 'Documentary': 6, 'Drama': 7,
        'Fantasy': 8, 'Film-Noir': 9, 'Horror': 10, 'Musical': 11,
        'Mystery': 12, 'Romance': 13, 'Sci-Fi': 14, 'Thriller': 15,
        'War': 16, 'Western': 17
    }

    try:
        return {
            "user_id": int(raw_input["user_id"]),
            "item_id": int(raw_input["item_id"]),
            "gender": gender_map[raw_input["gender"]],
            "age": age_map[int(raw_input["age"])],
            "occupation": occupation_map[int(raw_input["occupation"])],
            "genre": genre_map[raw_input["genre"]]
        }
    except KeyError as e:
        raise ValueError(f"Invalid input value: {e}")
