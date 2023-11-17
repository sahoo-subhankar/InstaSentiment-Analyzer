from django.db import models

class UserProfile(models.Model):
    username = models.CharField(max_length=255)
    score = models.FloatField(default=10)

    def __str__(self):
        return self.username

class Comment(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    comment_text = models.TextField()
    score = models.FloatField(default=0)

    def __str__(self):
        return self.comment_text
