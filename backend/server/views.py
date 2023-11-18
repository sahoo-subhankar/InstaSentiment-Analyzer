import instaloader
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile, UserComment
from .serializers import CommentDetailSerializer
from .comment_analysis import analyze_comment

@api_view(['GET', 'POST'])
def get_user_score(request, username):
    # Fetch comments using instaloader
    comments_data = fetch_instagram_comments(username)

    # Analyze comments and calculate score
    comment_scores = [analyze_comment(comment_data.get('text', '')) for comment_data in comments_data]
    average_comment_score = sum(comment_scores) / len(comment_scores)
    score = 10.0 - average_comment_score

    # Store comments and their associated scores in the database
    user_profile, _ = UserProfile.objects.get_or_create(username=username)
    
    for comment_data, comment_score in zip(comments_data, comment_scores):
        comment_text = comment_data.get('text', '')
        username = comment_data.get('username', '')

        # Create a new UserComment instance with individual scores
        UserComment.objects.create(
            user=user_profile,
            comment=comment_text,
            username=username,
            score=comment_score
        )

    # Update the user's profile score
    user_profile.score = score
    user_profile.save()

    # Return the calculated score
    return Response({'message': 'Score calculated successfully', 'score': score})

@api_view(['GET'])
def get_user_comments(request, username):
    # Fetch all comments for the specified username
    user_comments = UserComment.objects.filter(user__username=username)

    # Use a serializer to transform the QuerySet into JSON
    serializer = CommentDetailSerializer(user_comments, many=True)
    return Response({'message': 'Comments fetched successfully', 'comments': serializer.data})

def fetch_instagram_comments(username):
    L = instaloader.Instaloader()
    try:
        profile = instaloader.Profile.from_username(L.context, username)
        
        comments_data = []
        for post in profile.get_posts():
            comments_data.extend([{'text': comment.text, 'username': comment.owner_username} for comment in post.get_comments()])
        return comments_data
    except Exception as e:
        print(f"Error fetching comments for {username}: {str(e)}")
        return []