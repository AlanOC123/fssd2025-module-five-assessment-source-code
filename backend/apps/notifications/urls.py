"""
URL Configuration for the Notifications App.

This module maps the NotificationViewSet to the API URL structure using
Django Rest Framework's DefaultRouter.

Exposed Endpoints:
    - GET /api/notifications/            -> List user's notifications (Paginated)
    - POST /api/notifications/<id>/mark_read/ -> Mark specific notification as read
    - POST /api/notifications/mark_all_read/  -> Mark all as read
"""

from rest_framework.routers import DefaultRouter
from apps.notifications.views import NotificationViewSet
from django.urls import path, include

# Create a router and register our viewsets with it.
router = DefaultRouter()

# Register the NotificationViewSet.
# We use basename='notification' to ensure URL names are consistent (e.g., 'notification-list')
router.register(r'', NotificationViewSet, basename='notification')

urlpatterns = [
    # Include the router's generated URL patterns
    path('', include(router.urls))
]