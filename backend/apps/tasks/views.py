from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from .serializers import TaskSerializer
from .models import Task
from django_filters.rest_framework import DjangoFilterBackend


class TaskViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['assigned_to', 'is_completed', 'project']
    search_fields = ['title', 'description']
    queryset = Task.objects.all()

    def get_queryset(self):

        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save()
