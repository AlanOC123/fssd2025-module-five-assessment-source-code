"""
Root URL Configuration.

This module acts as the central traffic controller for the entire API.
It routes incoming requests to the appropriate application logic.

Structure:
1. Administration: Standard Django Admin.
2. Authentication: JWT-based endpoints (Login, Register, Password Reset).
3. Application Routes: Modular inclusions for Projects, Tasks, Chat, etc.
4. Static/Media: Handlers for serving user uploads during development.
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.shortcuts import redirect
from apps.core.views import trigger_daily_cron

# Authentication Views (dj-rest-auth)
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordResetView, 
    PasswordResetConfirmView, PasswordChangeView
)
from dj_rest_auth.jwt_auth import get_refresh_view
from apps.users.views import CustomUserDetailsView

def email_confirmation_redirect(request, uidb64, token):
    """
    SPA Redirect Helper for Password Resets.

    Problem:
    Django's password reset emails send a link pointing to the Backend 
    (e.g., http://localhost:8000/api/...). However, the actual "Reset Password" 
    form lives on the Frontend (e.g., http://localhost:5173/password/...).

    Solution:
    This view intercepts the email link click and redirects the user's browser 
    to the correct Frontend URL, passing along the security tokens.
    """
    frontend_url = f"{settings.PASSWORD_RESET_REDIRECT_LINK}/password/reset/confirm/{uidb64}/{token}"
    return redirect(frontend_url)

urlpatterns = [
    # --- 1. Administration ---
    path('admin/', admin.site.urls),

    # --- 2. Authentication & Account Management ---
    # Standard JWT Login/Logout
    path('api/auth/login/', LoginView.as_view(), name="rest_login"),
    path('api/auth/logout/', LogoutView.as_view(), name="rest_logout"),
    path('api/auth/token/refresh/', get_refresh_view().as_view(), name="token_refresh"),
    
    # Registration (Handles Sign-up and Email Verification)
    path('api/auth/register/', include('dj_rest_auth.registration.urls'), name="rest_register"),

    # User Profile (Uses our custom view for the "Me" endpoint)
    path('api/auth/active_user/', CustomUserDetailsView.as_view(), name="rest_current_user"),

    # Password Reset Flow
    path('api/auth/password/reset/', PasswordResetView.as_view(), name="password_reset"),
    path('api/auth/password/reset/confirm/<uidb64>/<token>/', email_confirmation_redirect, name="password_reset_confirm"),
    path('api/auth/password/reset/confirm/submit/', PasswordResetConfirmView.as_view(), name="password_reset_change"),
    path('api/auth/password/change/', PasswordChangeView.as_view(), name="rest_password_change"),

    # --- 3. Feature Applications ---
    # Modular routing delegates logic to specific apps
    path("api/projects/", include("apps.projects.urls")),
    path("api/profiles/", include("apps.users.urls")),
    path("api/tasks/", include("apps.tasks.urls")),
    path("api/chat/", include("apps.chat.urls")),
    path("api/notifications/", include("apps.notifications.urls")),

    # ---4. Production Env Media Serving ---
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),

    # --- 5. CRON Job Trigger ---
    path("api/cron/trigger/<str:token>/", trigger_daily_cron)
]

# --- 4. Development Media Serving ---
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)