from django.contrib import admin
from .models import UserProfile,UserComment

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(UserComment)