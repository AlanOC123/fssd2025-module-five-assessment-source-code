from django.contrib import admin
from django.urls import path, include
from .views import UserProfileDetailView

urlpatterns = [
    path('active_user/', UserProfileDetailView.as_view(), name="active_user")
]