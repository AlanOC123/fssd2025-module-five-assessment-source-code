from .models import Project, ProjectMembership, ProjectComment
from rest_framework import serializers
from apps.users.models import UserProfile
from apps.users.serializers import UserProfileSerializer
from django.contrib.auth import get_user_model
from django.conf import settings
from typing import List

UserClass = get_user_model()

class ProjectMembershipSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(source="user.profile", read_only=True)

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
    owner = UserProfileSerializer(source="owner.profile", read_only=True)
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
    owner = UserProfileSerializer(source="owner.profile", read_only=True)
    members = serializers.SerializerMethodField()
    is_pinned = serializers.BooleanField(read_only=True)
    progress = serializers.SerializerMethodField()

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
            "is_pinned",
            "progress"
        ]

        read_only_fields = ["created_at", "updated_at"]
    
    def get_members(self, obj):
        active_memberships: List[ProjectMembership] = obj.memberships.filter(status="active").select_related("user__profile")

        profiles = [m.user.profile for m in active_memberships]

        return UserProfileSerializer(profiles, many=True).data

    def get_progress(self, obj):
        total_tasks = obj.tasks.count()
        
        if total_tasks == 0:
            return 0
            
        completed_tasks = obj.tasks.filter(is_completed=True).count()
        return round((completed_tasks / total_tasks) * 100)

class ProjectCommentSerializer(serializers.ModelSerializer):
    author_detail = UserProfileSerializer(source='author', read_only=True)
    
    class Meta:
        model = ProjectComment
        fields = ['id', 'project', 'author', 'author_detail', 'content', 'created_at']
        read_only_fields = ['author', 'created_at']