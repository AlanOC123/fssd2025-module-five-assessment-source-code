from django.shortcuts import render
from rest_framework import viewsets
from .serializer import NotificationSerializer
from .models import Notification

# Create your views here.
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer