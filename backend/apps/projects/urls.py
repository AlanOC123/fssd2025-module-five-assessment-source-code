from django.urls import path, include
from .views import ProjectViewSet, ProjectCommentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', viewset=ProjectViewSet, basename="project")
router.register(r'comments', viewset=ProjectCommentViewSet, basename="project_comment")

urlpatterns = [
    path('', include(router.urls))
]