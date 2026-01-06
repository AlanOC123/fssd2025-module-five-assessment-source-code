from .models import Project, PinnedProject
from .serializers import ProjectListSerializer, ProjectDetailSerializer, ProjectCreateSerializer
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import IsProjectMember
from django.db.models import Q, Exists, OuterRef

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsProjectMember]
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "owner__email", "description", "status"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProjectDetailSerializer
        
        if self.action == "create":
            return ProjectCreateSerializer
        
        return ProjectListSerializer

    def get_queryset(self):
        user = self.request.user

        is_pinned_subquery = PinnedProject.objects.filter(
            project=OuterRef("pk"),
            user=user
        )

        return Project.objects.filter(
            Q(owner=user) | Q(memberships__user=user, memberships__status="active")
        ).annotate(
            is_pinned=Exists(is_pinned_subquery)
        ).distinct().order_by(
            "-updated_at"
        )
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @action(detail=True, methods=['post'])
    def pin(self, request, pk=None):
        project = self.get_object()
        user = request.user

        pinned_obj, created = PinnedProject.objects.get_or_create(
            project=project,
            user=user
        )

        if not created:
            pinned_obj.delete()
            return Response({ "status": "unpinned", "is_pinned": False })
    
        return Response({ "status": "pinned", "is_pinned": True })

