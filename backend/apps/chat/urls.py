"""
URL Configuration for the Chat Module.

This module uses DRF's DefaultRouter to automatically map the ChatMessageViewSet 
to standard RESTful endpoints.

Exposed Endpoints:
    - GET /api/chat/?project=<id>  -> Retrieve message history for a specific project.
    - POST /api/chat/              -> Send a new message.
    - DELETE /api/chat/<id>/       -> Delete a message (Owner only).
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatMessageViewSet

# Initialize the router
router = DefaultRouter()

# Register the ChatMessageViewSet.
# We use basename='chat' to ensure URL names are predictable (e.g., 'chat-list', 'chat-detail').
# This makes it easier to use reverse in view tests e.g reverse('chat-list')
router.register(r'', ChatMessageViewSet, basename='chat')

urlpatterns = [
    # Include the auto-generated URL patterns from the router
    path('', include(router.urls)),
]