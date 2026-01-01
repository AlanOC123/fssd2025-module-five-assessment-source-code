from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView, PasswordResetView, PasswordResetConfirmView, PasswordChangeView
from dj_rest_auth.jwt_auth import get_refresh_view
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect

def email_confirmation_redirect(request, uidb64, token):
    frontend_url = f"{settings.PASSWORD_RESET_REDIRECT_LINK}/password/reset/confirm/{uidb64}/{token}"
    return redirect(frontend_url)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', LoginView.as_view(), name="rest_login"),
    path('api/auth/logout/', LogoutView.as_view(), name="rest_logout"),
    path('api/auth/users/me/', UserDetailsView.as_view(), name="rest_current_user"),
    path('api/auth/register/', include('dj_rest_auth.registration.urls'), name="rest_register"),
    path('api/auth/token/refresh/', get_refresh_view().as_view(), name="token_refresh"),
    path('api/auth/password/reset/', PasswordResetView.as_view(), name="password_reset"),
    path('api/auth/password/reset/confirm/<uidb64>/<token>/', email_confirmation_redirect,  name="password_reset_confirm"),
    path('api/auth/password/reset/confirm/submit/', PasswordResetConfirmView.as_view(), name="password_reset_change")
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)