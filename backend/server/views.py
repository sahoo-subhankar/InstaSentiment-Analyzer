from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile, Comment
from .serializers import CommentDetailSerializer
from .comment_analysis import analyze_comment
from decouple import config
import requests

@api_view(['GET', 'POST'])
def get_user_score(request, username):
    ACCESS_TOKEN = config('ACCESS_TOKEN')

    # Make a request to the Instagram Graph API to get comments
    url = f'https://graph.instagram.com/v12.0/{username}?fields=media%7Bcomments%7D&access_token={ACCESS_TOKEN}'
    response = requests.get(url)
    data = response.json()

    # Extract comments
    comments_data = data.get('media', {}).get('comments', {}).get('data', [])

    # Analyze comments and calculate score
    comment_scores = [analyze_comment(comment_data.get('text', '')) for comment_data in comments_data]
    average_comment_score = sum(comment_scores) / len(comment_scores)
    score = 10.0 - average_comment_score

    # Store comments and their associated scores in the database
    user_profile = request.user.userprofile
    for comment_data, comment_score in zip(comments_data, comment_scores):
        comment_text = comment_data.get('text', '')
        username = comment_data.get('username', '')

        # Create a new Comment instance with individual scores
        Comment.objects.create(
            user_profile=user_profile,
            comment_text=comment_text,
            username=username,
            score=comment_score
        )

    # Update the user's profile score
    user_profile.score = score
    user_profile.save()

    # Return the calculated score
    return Response({'message': 'Score calculated successfully', 'score': score})

@api_view(['GET', 'POST'])
def get_user_comments(request, username):
    # Fetch all comments for the specified username
    user_comments = Comment.objects.filter(user_profile__username=username)

    # Use a serializer to transform the QuerySet into JSON
    serializer = CommentDetailSerializer(user_comments, many=True)

    return Response({'message': 'Comments fetched successfully', 'comments': serializer.data})
