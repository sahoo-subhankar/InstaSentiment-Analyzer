from django.urls import path
from .views import create_comment, fetch_comments

urlpatterns = [
    path('create_comment/', create_comment, name='create-comment'),
    path('fetch_comments/', fetch_comments, name='fetch-comments'),
]
