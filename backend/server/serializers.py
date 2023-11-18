from rest_framework import serializers
from .models import UserProfile, UserComment


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class CommentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserComment
        fields = "__all__"
