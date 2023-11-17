from django.contrib import admin
from .models import UserProfile,Comment

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Comment)