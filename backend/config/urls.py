from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from dj_rest_auth.jwt_auth import get_refresh_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', LoginView.as_view(), name="rest_login"),
    path('api/auth/logout/', LogoutView.as_view(), name="rest_logout"),
    path('api/auth/users/me/', UserDetailsView.as_view(), name="rest_current_user"),
    path('api/auth/register/', include('dj_rest_auth.registration.urls'), name="rest_register"),
    path('api/auth/token/refresh/', get_refresh_view().as_view(), name="token_refresh"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)