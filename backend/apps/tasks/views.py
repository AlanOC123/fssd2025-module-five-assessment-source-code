from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.utils import timezone

from .models import Task
from .serializers import TaskSerializer

class TaskViewset(viewsets.ModelViewSet):
    """
    ViewSet for managing Project Tasks.
    
    Features:
    - CRUD for Tasks.
    - Filtering by Project, Assignee, and Completion status.
    - Security: Scopes results to projects the user is a member of.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer
    
    # Enable robust filtering for the frontend dashboard
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['assigned_to', 'is_completed', 'project']
    search_fields = ['title', 'description']
    ordering_fields = ['due_date', 'created_at']

    def get_queryset(self):
        """
        Restricts the task list to contextually relevant items.
        
        Returns:
            QuerySet: Tasks belonging to projects where the user is either the Owner OR an Active Member.
        """
        user = self.request.user
        
        # Security Filter:
        # 1. Project is owned by User
        # 2. OR Project has a membership for User
        return Task.objects.filter(
            Q(project__owner=user) | 
            Q(project__memberships__user=user)
        ).distinct()

    def perform_create(self, serializer):
        """
        Saves the new task. 
        """
        serializer.save()

    @action(detail=True, methods=['post'])
    def toggle_complete(self, request, pk=None):
        """
        Custom action to toggle the completion status.
        
        This handles the logic of setting 'completed_at' and 'completed_by'
        automatically, ensuring data integrity for audit trails.
        """
        task = self.get_object()
        
        if not task.is_completed:
            # Mark as Done
            task.is_completed = True
            task.completed_at = timezone.now()
            # Link to the UserProfile of the person who clicked the button
            if hasattr(request.user, 'profile'):
                task.completed_by = request.user.profile
        else:
            # Mark as Undone
            task.is_completed = False
            task.completed_at = None
            task.completed_by = None
            
        task.save()
        
        return Response(self.get_serializer(task).data, status=status.HTTP_200_OK)
