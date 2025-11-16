from rest_framework.routers import DefaultRouter
from .views import PreferenceViewSet, ThemeViewSet, NoteViewSet

router = DefaultRouter()

router.register(prefix=r'preferences', viewset=PreferenceViewSet, basename='preferences')
router.register(prefix=r'themes', viewset=ThemeViewSet, basename='themes')
router.register(prefix=r'notes', viewset=NoteViewSet, basename='notes')

urlpatterns = router.urls