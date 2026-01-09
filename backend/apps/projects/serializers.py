from .models import Project, ProjectMembership
from rest_framework import serializers
from apps.users.models import UserProfile
from django.contrib.auth import get_user_model
from django.conf import settings

UserClass = get_user_model()

class ProjectUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source="user.email")

    class Meta:
        model = UserProfile
        fields = ["id", "email", "full_name"]

class ProjectMembershipSerializer(serializers.ModelSerializer):
    user = ProjectUserSerializer(source="user.profile", read_only=True)

    class Meta:
        model = ProjectMembership
        fields = [
            "id", 
            "user", 
            "access_level", 
            "status", 
            "date_sent"
        ]

class ProjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["title", "description", "start_date", "end_date", "status"]

class ProjectListSerializer(serializers.ModelSerializer):
    owner = ProjectUserSerializer(source="owner.profile", read_only=True)
    is_pinned = serializers.BooleanField(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "status",
            "owner",
            "updated_at",
            "is_pinned"
        ]

class ProjectDetailSerializer(serializers.ModelSerializer):
    owner = ProjectUserSerializer(source="owner.profile", read_only=True)
    members = ProjectMembershipSerializer(source="memberships", read_only=True, many=True)
    is_pinned = serializers.BooleanField(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "status",
            "owner",
            "members",
            "created_at",
            "start_date",
            "end_date",
            "updated_at",
            "is_pinned"
        ]

        read_only_fields = ["owner", "created_at", "updated_at"]