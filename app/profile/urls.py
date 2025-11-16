from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(prefix=r'preferences', viewset=views.PreferenceViewSet, basename='preferences')
router.register(prefix=r'themes', viewset=views.ThemeViewSet, basename='themes')
router.register(prefix=r'notes', viewset=views.NoteViewSet, basename='notes')

urlpatterns = router.urls