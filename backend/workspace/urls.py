from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(prefix=r'projects', viewset=views.ProjectViewSet, basename='project')
router.register(prefix=r'components', viewset=views.ComponentViewSet, basename='component')
router.register(prefix=r'tasks', viewset=views.TaskViewSet, basename='task')
router.register(prefix=r'comments', viewset=views.CommentViewSet, basename='comment')

urlpatterns = router.urls