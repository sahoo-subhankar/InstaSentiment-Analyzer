from django.db import models


class UserProfile(models.Model):
    username = models.CharField(max_length=255, unique=True)
    score = models.FloatField(default=10.0)

    def __str__(self):
        return self.username


class UserComment(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    comment_text = models.TextField()

    def __str__(self):
        return self.comment_text
