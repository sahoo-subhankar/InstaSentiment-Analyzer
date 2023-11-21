from django.contrib import admin
from .models import UserProfile, ScoreHistory

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(ScoreHistory)
