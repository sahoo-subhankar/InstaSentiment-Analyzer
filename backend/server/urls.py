from django.urls import path
from .views import get_user_score, get_user_comments

urlpatterns = [
    path('get_user_score/<str:username>/', get_user_score, name='user_score'),
    path('get_user_comments/<str:username>/', get_user_comments, name='user_comment'),
]