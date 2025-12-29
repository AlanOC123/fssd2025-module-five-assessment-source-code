from django.contrib import admin
from django.urls import path, include

url_patterns = [
    path('admin/', admin.site.urls),

    # JWT
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/register/', include('dj_rest_auth.registration.urls'))
]