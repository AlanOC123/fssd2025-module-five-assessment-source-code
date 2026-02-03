from rest_framework import serializers
from apps.tasks.models import Task
from apps.users.models import UserProfile
from apps.users.serializers import UserProfileSerializer

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for Task management.

    Implementation Strategy: Dual-Field Relationship.
    To provide a seamless experience for both the frontend developer and the end-user, 
    this serializer uses two fields for the 'assigned_to' relationship:
    1. assigned_to: A writable PrimaryKeyRelatedField for sending updates (ID only).
    2. assigned_to_detail: A read-only nested serializer for UI rendering (Name, Avatar).

    Attributes:
        assigned_to_detail (dict): Nested profile data for the assignee.
        completed_by_detail (dict): Nested profile data for the user who finished the task.
    """

    # Read-only nested details for the UI (Avatars, Full Names)
    assigned_to_detail = UserProfileSerializer(source='assigned_to', read_only=True)
    completed_by_detail = UserProfileSerializer(source='completed_by', read_only=True)

    # Writable ID field for API requests (POST/PATCH)
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(),
        required=False,
        allow_null=True,
        help_text="The ID of the UserProfile to assign this task to."
    )

    class Meta:
        model = Task
        fields = [
            'id', 
            'title', 
            'description', 
            'project', 
            'assigned_to',
            'assigned_to_detail',
            'is_completed', 
            'completed_by_detail', 
            'completed_at',
            'due_date', 
            'created_at', 
            'updated_at'
        ]
        
        # System-managed fields that cannot be altered by the client directly
        read_only_fields = [
            'created_at', 
            'updated_at', 
            'completed_at', 
            'completed_by_detail'
        ]

def validate(self, data):
        """
        Custom validation for task-specific business rules.
        """
        project = data.get('project')
        due_date = data.get('due_date')

        if project and due_date and project.start_date:
            if due_date < project.start_date:
                raise serializers.ValidationError({
                    "due_date": "Task due date cannot be before the project start date."
                })

        return data