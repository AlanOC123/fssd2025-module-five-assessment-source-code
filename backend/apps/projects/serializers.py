from rest_framework import serializers
from django.contrib.auth import get_user_model
from typing import List

from .models import Project, ProjectMembership, ProjectComment
from apps.users.serializers import UserProfileSerializer

UserClass = get_user_model()

class ProjectMembershipSerializer(serializers.ModelSerializer):
    """
    Serializer for the intermediate ProjectMembership model.

    Challenge: Handling 'Ghost' Users.
    When an admin invites a new email address that isn't registered yet, the 
    `user` ForeignKey is Null. This serializer gracefully handles both states:
    1. Registered User -> Returns real name, avatar, and email.
    2. Pending Invite (Ghost) -> Returns 'Pending Invite', default avatar, and invite email.

    Attributes:
        first_name (str): Computed display name.
        email (str): Computed contact email.
    """
    
    # We use SerializerMethodField to abstract away the complexity of 
    # checking both the 'User' relation and the 'invite_email' field.
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = ProjectMembership
        fields = [
            'id', 
            'status', 
            'access_level', 
            'first_name', 
            'last_name', 
            'email', 
            'avatar',
            'date_sent'
        ]

    def get_email(self, obj):
        """Returns the user's email if registered, otherwise the invitation email."""
        return obj.user.email if obj.user else obj.invite_email

    def get_first_name(self, obj):
        """Returns real first name or a placeholder for pending invites."""
        if obj.user and hasattr(obj.user, 'profile'):
            return obj.user.profile.first_name
        return "Pending"

    def get_last_name(self, obj):
        """Returns real last name or a placeholder context."""
        if obj.user and hasattr(obj.user, 'profile'):
            return obj.user.profile.last_name
        return "Invite"

    def get_avatar(self, obj):
        """
        Safe avatar URL generation.
        Checks chain: User Exists -> Profile Exists -> Avatar Exists.
        """
        if obj.user and hasattr(obj.user, 'profile') and obj.user.profile.avatar:
            request = self.context.get('request')
            avatar_url = obj.user.profile.avatar.url
            # Helper to ensure we return a full absolute URL (http://domain/media/...)
            if request is not None:
                return request.build_absolute_uri(avatar_url)
            return avatar_url
        return None

class ProjectCreateSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for creating new projects.
    Excludes computed fields (progress, members) that don't exist yet.
    """
    class Meta:
        model = Project
        fields = ["title", "description", "start_date", "end_date", "status"]

class ProjectListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for the Project Dashboard (Card View).

    Optimization:
    - Only fetches essential fields to keep the list API fast.
    - 'is_pinned' is expected to be annotated onto the queryset by the View.
    """
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
    """
    Heavyweight serializer for the Single Project Page.

    Features:
    - Data Aggregation: Calculates 'progress' on the fly.
    - Filtering: Only shows 'active' members in the member list, hiding pending invites.
    """
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
        """
        Returns a list of UserProfiles for *Active* members only.
        Pending invites are excluded from the main member list UI.
        """
        # Optimization: select_related fetches profile data in the same SQL query
        active_memberships = obj.memberships.filter(status="active").select_related("user__profile")
        
        # Extract the user profile from each membership
        profiles = [m.user.profile for m in active_memberships if m.user]

        return UserProfileSerializer(profiles, many=True).data

    def get_progress(self, obj):
        """
        Calculates project completion percentage based on tasks.

        Returns:
            int: 0 to 100 representing the percentage of completed tasks.
        """
        total_tasks = obj.tasks.count()
        
        if total_tasks == 0:
            return 0
            
        completed_tasks = obj.tasks.filter(is_completed=True).count()
        return round((completed_tasks / total_tasks) * 100)

class ProjectCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for project comments with author enrichment.
    """
    # Flattens the author field so the frontend gets { id: 1, first_name: "John"... }
    # instead of just { author: 1 }
    author_detail = UserProfileSerializer(source='author.profile', read_only=True)
    
    class Meta:
        model = ProjectComment
        fields = ['id', 'project', 'author', 'author_detail', 'content', 'created_at']
        read_only_fields = ['author', 'created_at']