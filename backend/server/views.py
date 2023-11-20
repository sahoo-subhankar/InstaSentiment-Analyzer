import os
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .comment_analysis import analyze_comment
from .models import UserProfile


@api_view(["GET"])
def get_user_score_instagram(request, username):
    comments_data = []

    # Specify the folder path
    folder_path = "C:\\Users\\sahoo\\development__purpose"

    # Read text files (.txt)
    for filename in os.listdir(folder_path):
        if filename.endswith(".txt"):
            with open(os.path.join(folder_path, filename), "r") as file:
                text = file.read()
                comments_data.append({"text": text})

    # Read JSON files (.json)
    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            with open(os.path.join(folder_path, filename), "r") as file:
                json_data = json.load(file)
                for item in json_data:
                    if "text" in item:
                        comments_data.append({"text": item["text"]})

    # Analyze comments and calculate score
    comment_scores = [
        analyze_comment(comment_data.get("text", "")) for comment_data in comments_data
    ]
    average_comment_score = sum(comment_scores) / len(comment_scores)
    new_score = 10.0 - average_comment_score

    # Retrieve the user's existing profile
    user_profile, created = UserProfile.objects.get_or_create(username=username)
    if created or new_score < user_profile.score:
        user_profile.score = new_score
        user_profile.save()

    return Response({"message": "Score calculated successfully", "score": new_score})
