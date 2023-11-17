from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, Comment
from .serializers import UserProfileSerializer, CommentSerializer
from .comment_analysis import analyze_comment
from decouple import config
import requests

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        instance = serializer.save()

        # Perform comment analysis
        if analyze_comment(instance.comment_text):
            instance.user_profile.score -= 0.1
            instance.user_profile.save()

        return Response({'message': 'Comment created successfully'})
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_comments(request):
    instagram_username = request.data.get('instagram_username')
    ACCESS_TOKEN = config('ACCESS_TOKEN')

    # Make a request to the Instagram Graph API to get comments
    url = f'https://graph.instagram.com/v12.0/{instagram_username}?fields=media%7Bcomments%7D&access_token={ACCESS_TOKEN}'
    response = requests.get(url)
    data = response.json()

    # Extract comments and store in the database
    comments_data = data.get('media', {}).get('data', [])
    for comment_data in comments_data:
        comment_text = comment_data.get('comments', {}).get('data', {}).get('text', '')
        username = comment_data.get('comments', {}).get('data', {}).get('username', '')

        # Create a new Comment instance
        Comment.objects.create(
            user_profile=request.user.userprofile,
            comment_text=comment_text,
            username=username
        )

    # Return a response
    return Response({'message': 'Comments fetched and stored successfully'})
