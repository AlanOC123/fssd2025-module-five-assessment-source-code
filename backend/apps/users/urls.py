from django.urls import path
from .views import UserProfileDetailView

"""
URL Configuration for the Users App.

Note on Authentication:
Standard auth endpoints (Login, Logout, Register) are handled by 'dj-rest-auth' 
and are registered in the main project's urls.py, not here.

Exposed Endpoints:
    - GET /api/users/active_user/ -> Returns the full profile of the currently logged-in user.
      (Used to hydrate the frontend 'UserProvider' context).
"""

urlpatterns = [
    # Custom endpoint to fetch the current user's rich profile data
    path('active_user/', UserProfileDetailView.as_view(), name="active_user")
]