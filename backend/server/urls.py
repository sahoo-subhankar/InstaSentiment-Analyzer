from django.urls import path
from .views import get_user_score_instagram

# 1. http://127.0.0.1:8000/api/get_user_score_instagram/${username}
urlpatterns = [
    path(
        "get_user_score_instagram/<str:username>/",
        get_user_score_instagram,
        name="user_score",
    ),
]
