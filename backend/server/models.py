from django.db import models

# Create your models here.
class UserProfile(models.Model):
    username = models.CharField(max_length=255)
    score = models.IntegerField(default=10)
    
    def __str__(self):
        return self.username

class Comment(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    comment_text = models.TextField()
    
    def __str__(self):
        return self.comment_text