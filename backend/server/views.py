import os
import json
import subprocess
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .comment_analysis import analyze_comment
from .comment_data_statistics import (
    analyze_positive_comment,
    analyze_negetive_comment,
    count_total_words,
)
from .models import UserProfile
from django.core.mail import send_mail
from django.conf import settings


@api_view(["GET"])
def get_user_score_instagram(request, username, email):
    # Run the instaloader command
    instaloader_command = f'instaloader --comments --filename-pattern "{{shortcode}}_{{date_utc}}_UTC" --no-videos --no-video-thumbnails --no-pictures --no-metadata-json --no-compress-json --no-profile-pic --login=sahoo__subha --dirname-pattern "C:\\Users\\sahoo\\OneDrive\\Documents\\Projects\\InstaSentiment Analyzer\\InstaSentiment-Analyzer\\backend\\Instagram Scraped Files\\{{profile}}" profile {username}'

    try:
        # Run the command using subprocess
        subprocess.run(instaloader_command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        return Response(
            {"message": f"Error running instaloader command: {e}", "score": 0.0}
        )

    # used to store comments
    comments_data = []

    # Specify the folder path with the dynamic username
    folder_path = os.path.join(
        "C:\\Users\\sahoo\\OneDrive\\Documents\\Projects\\InstaSentiment Analyzer\\InstaSentiment-Analyzer\\backend\\Instagram Scraped Files",
        username,
    )

    # Read text files (.txt)
    for filename in os.listdir(folder_path):
        if filename.endswith(".txt"):
            with open(
                os.path.join(folder_path, filename), "r", encoding="utf-8"
            ) as file:
                try:
                    text = file.read()
                    comments_data.append({"text": text})
                except UnicodeDecodeError as e:
                    return Response(
                        {
                            "message": f"Error decoding file {filename}: {e}",
                            "score": 0.0,
                        }
                    )

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
    new_score = round(10.0 - average_comment_score, 2)

    # Analyze comments and calculate positive words score
    positive_comment_scores = [
        analyze_positive_comment(comment_data.get("text", ""))
        for comment_data in comments_data
    ]
    positive_comment_score = sum(positive_comment_scores)

    # Analyze comments and calculate negetive words score
    negetive_comment_scores = [
        analyze_negetive_comment(comment_data.get("text", ""))
        for comment_data in comments_data
    ]
    negetive_comment_score = sum(negetive_comment_scores)

    # Analyze comments and calculate total words score
    total_comment_scores = [
        count_total_words(comment_data.get("text", ""))
        for comment_data in comments_data
    ]
    total_comment_score = sum(total_comment_scores)
    neutral_comment_score = total_comment_score - (
        positive_comment_score + negetive_comment_score
    )

    # Email Configuration
    email_from = settings.EMAIL_HOST_USER
    
    # Retrieve the user's existing profile
    user_profile, created = UserProfile.objects.get_or_create(username=username)
    
    if created or new_score < user_profile.score:
        user_profile.score = new_score
        send_mail(
            "Sentiment Analysis Platform: Profile Rating Update",
            f"Rating Decreased for Profile Name {username}. The New Rating is {new_score}. Check Site for more Info.",
            email_from,
            [email],
            fail_silently=False,
        )
        user_profile.save()
    else:
        send_mail(
            "Sentiment Analysis Platform: Profile Rating Update",
            f"Rating Calculated for Profile Name {username}. Rating still same that is {new_score}. Check Site for more Info.",
            email_from,
            [email],
            fail_silently=False,
        )

    return Response(
        {
            "message": "Score Calculated Successfully",
            "email_message": "Email Send Successfully",
            "score": new_score,
            "pos_score": positive_comment_score,
            "neg_score": negetive_comment_score,
            "neu_score": neutral_comment_score,
        }
    )
