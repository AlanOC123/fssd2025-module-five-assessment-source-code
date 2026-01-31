from django.shortcuts import render
from .serializers import NotificationSerializer
from .models import Notification
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

class NotificationViewSet(ModelViewSet):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    @action(detail=True, methods=["post"], url_path='mark_as_read')
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True

        return Response({ 'detail': 'Notification Read' })
