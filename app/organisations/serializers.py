from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Organisation, Team, Membership

class UserSerializer(serializers.ModelSerializer):
    """Serializes the User into usable API fields to be objectified in the front end"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MembershipSerializer(serializers.ModelSerializer):
    """Serializes Memberships into usable API fields to be objectified in the front end"""

    # Use a serliased version of the user. Read only specifies Membership cant edit?
    user = UserSerializer(read_only=True)

    class Meta:
        model = Membership
        fields = ['user', 'team', 'role']

class TeamSerializer(serializers.ModelSerializer):
    """Serializes memberships into usable API fields to be objectified in the front end"""

    # Use a serliased version of the memberships. Many infers an array of all members?
    memberships = MembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = [
            'team_name', 'description', 'department', 
            'is_private', 'enrollment_type', 'memberships'
        ]

class OrganisationSerializer(serializers.ModelSerializer):
    """Serializes organisations into usable API fields to be objectified in the front end"""
    owner = UserSerializer(read_only=True)
    teams = TeamSerializer(read_only=True, many=True)

    class Meta:
        model = Organisation
        fields = ['name', 'org_type', 'teams', 'owner']