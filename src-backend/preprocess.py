import os
print(f"[📂 Using]: {__file__}")
print("[🚀 preprocess.py LOADED]")
def encode_user_profile(raw_input):
    print("[🐞 DEBUG] Raw input received:", raw_input)
    gender_map = {'F': 0, 'M': 1}
    age_map = {1: 0, 18: 1, 25: 2, 35: 3, 45: 4, 50: 5, 56: 6}
    occupation_map = {i: i for i in range(21)}

    try:
        return {
            "gender": gender_map[raw_input["gender"]],
            "age": age_map[int(raw_input["age"])],
            "occupation": occupation_map[int(raw_input["occupation"])]
        }
    except KeyError as e:
        raise ValueError(f"Invalid input value: {e}")
