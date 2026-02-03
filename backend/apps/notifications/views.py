from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.pagination import PageNumberPagination

class NotificationPagination(PageNumberPagination):
    """
    Custom pagination settings for the notification list.
    
    We limit the page size to 20 to ensure the notification sheet loads instantly
    even for users with thousands of old alerts.
    """
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class NotificationViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """
    API ViewSet for retrieving and managing notifications.

    Inheritance:
        - GenericViewSet: Provides base logic (get_object, get_queryset).
        - ListModelMixin: Only enables the 'List' (GET /) action by default.
          (We do not want standard Create/Update/Delete endpoints exposed).
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NotificationPagination

    def get_queryset(self):
        """
        Returns the list of notifications for the *current user only*.
        
        This method implements two key features:
        1. **Security:** Users can never access notifications belonging to others.
        2. **Filtering:** Handles the '?status=' query param for the frontend tabs.

        Returns:
            QuerySet: Filtered and ordered notification objects.
        """
        # Base security filter: Always restrict to the request user
        qs = Notification.objects.filter(recipient=self.request.user).order_by('-created_at')

        status_param = self.request.query_params.get("status")

        # Dynamic filtering based on the 'status' URL parameter
        if status_param == "read":
            qs = qs.filter(is_read=True)
        
        elif status_param == "unread":
            qs = qs.filter(is_read=False)

        return qs

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """
        Custom action to mark a single notification as read.
        
        URL: POST /api/notifications/<pk>/mark_read/
        """
        # self.get_object() automatically handles 404s if the ID doesn't exist
        # or doesn't belong to the current user (based on get_queryset).
        notification = self.get_object()
        
        if not notification.is_read:
            notification.is_read = True
            notification.save()
            
        return Response({'status': 'marked as read'})

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        """
        Custom action to mark ALL unread notifications as read at once.
        
        URL: POST /api/notifications/mark_all_read/
        
        Performance Note:
            We use a queryset .update() method here. This translates to a single 
            SQL UPDATE statement, which is significantly faster than iterating 
            over objects and saving them one by one.
        """
        # 1 SQL query to update potentially hundreds of rows
        self.get_queryset().filter(is_read=False).update(is_read=True)
        
        return Response({'status': 'all marked as read'})
