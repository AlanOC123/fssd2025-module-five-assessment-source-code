from rest_framework import serializers
from .models import Project, Task, Component, Comment
from directory.serializers import UserSerializer

class TaskSerializer(serializers.ModelSerializer):
    """Base serialiser for project tasks"""

    assigned = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = [
            'name', 'assigned', 'status',
            'difficulty', 'priority', 'start_date',
            'due_date'
        ]

class ComponentSerializer(serializers.ModelSerializer):
    """Base serializer for project components"""

    assigned = UserSerializer(read_only=True)
    tasks = TaskSerializer(read_only=True, many=True)

    class Meta:
        model = Component
        fields = [
            'name', 'tasks', 'assigned'
        ]

class ProjectSerializer(serializers.ModelSerializer):
    """Base serializer for project conversion"""

    project_components = ComponentSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = [
            'name', 'status', 'difficulty',
            'priority', 'start_date', 'end_date',
            'project_components'
        ]

class CommentSerializer(serializers.ModelSerializer):
    """Base serialiser for project tasks"""
    project = ProjectSerializer(read_only=True)
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'project', 'author', 'message',
            'created_at', 'visibility'
        ]