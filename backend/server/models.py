from django.db import models


class UserProfile(models.Model):
    username = models.CharField(max_length=255, unique=True)
    score = models.FloatField(default=10.0)

    def __str__(self):
        return self.username
