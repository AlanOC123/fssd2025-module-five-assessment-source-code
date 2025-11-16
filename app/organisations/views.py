from django.shortcuts import render
from rest_framework import viewsets
from .models import Organisation, Team, Membership
from .serializers import TeamSerializer, MembershipSerializer, OrganisationSerializer, UserSerializer
from django.contrib.auth.models import User


# Create your views here.
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """Read Only endpoint for listing users"""

    # Pool of users to query from
    queryset = User.objects.all()

    # Class to convert the found user
    serializer_class = UserSerializer

class OrganisationViewSet(viewsets.ModelViewSet):
    """Full CRUD endpoint for listing Organisations"""

    queryset = Organisation.objects.all()

    serializer_class = OrganisationSerializer

class MembershipViewSet(viewsets.ModelViewSet):
    """Full CRUD endpoint for listing Memberships"""

    queryset = Membership.objects.all()

    serializer_class = MembershipSerializer

class TeamViewSet(viewsets.ModelViewSet):
    """Full CRUD endpoint for listing Teams"""

    queryset = Team.objects.all()

    serializer_class = TeamSerializer



