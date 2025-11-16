from rest_framework.routers import DefaultRouter

from . import views

# Route builder
router = DefaultRouter()

# Users route (CRUD) -> /users/ & /users/[id]/
router.register(prefix=r'users', viewset=views.UserViewSet, basename='user')

# Organisations route (CRUD) -> /organisations/ & /organisations/[id]/
router.register(prefix=r'organisations', viewset=views.OrganisationViewSet, basename='organisation')

# Organisations route (CRUD) -> /memberships/ & /memberships/[id]/
router.register(prefix=r'memberships', viewset=views.MembershipViewSet, basename='membership')

# Organisations route (CRUD) -> /teams/ & /teams/[id]/
router.register(prefix=r'teams', viewset=views.TeamViewSet, basename='team')

# Export name
urlpatterns = router.urls