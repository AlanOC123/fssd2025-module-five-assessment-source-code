from django.urls import path, include

urlpatterns = [
    path('directory/', include('directory.urls')),
    path('workspace/', include('workspace.urls')),
    path('profile/', include('profile.urls')),
]