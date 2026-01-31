from rest_framework import serializers
from apps.users.serializers import UserProfileSerializer
from apps.users.models import UserProfile
from .models import Task

from rest_framework import serializers
from apps.tasks.models import Task
from apps.users.serializers import UserProfileSerializer # Make sure this is imported!
from apps.projects.models import Project

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_detail = UserProfileSerializer(source='assigned_to', read_only=True)
    completed_by_detail = UserProfileSerializer(source='completed_by', read_only=True)

    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(),
        required=False,
        allow_null=True
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
        
        read_only_fields = ['created_at', 'updated_at', 'completed_at', 'completed_by_detail']