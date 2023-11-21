from django.db import models


class UserProfile(models.Model):
    username = models.CharField(max_length=255, unique=True)
    score = models.FloatField(default=10.0)

    def __str__(self):
        return self.username


class ScoreHistory(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    score = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_profile.username} - {self.score} - {self.timestamp}"
