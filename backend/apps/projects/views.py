from .models import Project, PinnedProject, ProjectComment, ProjectMembership
from .serializers import (
    ProjectListSerializer, 
    ProjectDetailSerializer, 
    ProjectCreateSerializer, 
    ProjectCommentSerializer, 
    ProjectMembershipSerializer
)
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from .permissions import IsProjectMember
from django.db.models import Q, Exists, OuterRef
from .filters import ProjectFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

class ProjectViewSet(viewsets.ModelViewSet):
    """
    The core ViewSet for managing the Project lifecycle.

    This ViewSet handles:
    1. CRUD operations for Projects.
    2. Dynamic Serializer Switching (Lightweight List vs. Heavyweight Detail).
    3. Custom Actions: Pinning, Inviting, Responding to Invites.
    4. Advanced Querying: Annotating 'is_pinned' using Subqueries.
    """
    permission_classes = [permissions.IsAuthenticated, IsProjectMember]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProjectFilter

    search_fields = ["title", "owner__email", "description"]
    ordering_fields = ["updated_at", "created_at"]

    # Ensure URL regex allows numeric IDs
    lookup_value_regex = r'\d+'

    def get_serializer_class(self):
        """
        Switches serializers based on the action to optimize performance.
        
        - 'list': Uses ProjectListSerializer (Fast, few fields).
        - 'retrieve': Uses ProjectDetailSerializer (Includes members, progress).
        - 'create': Uses ProjectCreateSerializer (Validates input only).
        """
        if self.action in ["retrieve", "update", "partial_update"]:
            return ProjectDetailSerializer
        
        if self.action == "create":
            return ProjectCreateSerializer
        
        return ProjectListSerializer

    def get_queryset(self):
        """
        Retrieves projects the user owns OR is a member of.

        SQL Optimization:
        Instead of a separate API call to check if a project is pinned, we use 
        `annotate(is_pinned=Exists(...))` to attach a boolean flag to every 
        project in the main SQL query. This prevents the 'N+1' query problem.
        """
        user = self.request.user

        # Subquery to check for the existence of a pin record
        is_pinned_subquery = PinnedProject.objects.filter(
            project=OuterRef("pk"),
            user=user
        )

        return Project.objects.filter(
                    Q(owner=user) | Q(memberships__user=user) 
                ).annotate(
                    is_pinned=Exists(is_pinned_subquery)
                ).distinct().order_by(
                    "-updated_at"
                )
        
    def create(self, request, *args, **kwargs):
        """
        Custom create method to handle the serializer switch.
        Input: Simple Data (Title) -> Output: Complex Data (Title + Default Columns).
        """
        # 1. Validate Input
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 2. Save (Set Owner automatically)
        instance = serializer.save(owner=request.user)

        # 3. Return the Detail view immediately so the UI can redirect/render
        response_serializer = ProjectDetailSerializer(
            instance, 
            context=self.get_serializer_context()
        )
        
        headers = self.get_success_headers(response_serializer.data)
        return Response(
            response_serializer.data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    
    @action(detail=True, methods=['post'])
    def pin(self, request, pk=None):
        """
        Toggles the 'Pinned' status of a project for the current user.
        Endpoint: POST /api/projects/<id>/pin/
        """
        project = self.get_object()
        user = request.user

        pinned_obj, created = PinnedProject.objects.get_or_create(
            project=project,
            user=user
        )

        if not created:
            # If it existed, delete it (Unpin)
            pinned_obj.delete()
            return Response({ "status": "unpinned", "is_pinned": False })
    
        return Response({ "status": "pinned", "is_pinned": True })

    @action(detail=True, methods=['post'])
    def invite_member(self, request, pk=None):
        """
        Sends an invite to an email address.
        Endpoint: POST /api/projects/<id>/invite_member/
        Body: { "email": "user@example.com" }
        """
        project = self.get_object()
        email = request.data.get('email')
        
        if not email:
            return Response({"error": "Email is required"}, status=400)

        User = get_user_model()

        try:
            target_user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Future Proofing: Logic for 'Ghost Users' goes here
            return Response(
                {"error": "User with this email does not exist."}, 
                status=404
            )

        # Idempotency Check: Don't invite the same person twice
        if ProjectMembership.objects.filter(project=project, user=target_user).exists():
            return Response(
                {"error": "User is already a member or has a pending invite"}, 
                status=400
            )

        # Create the Pending Record
        ProjectMembership.objects.create(
            project=project,
            user=target_user,
            status=ProjectMembership.Status.PENDING,
            access_level=ProjectMembership.AccessLevel.VIEWER
        )
        
        return Response({"message": "Invitation sent successfully"}, status=201)

    @action(detail=False, methods=['get'])
    def pending_invites(self, request):
        """
        List all projects where the current user has a PENDING invite.
        Used for the 'Invitations' dashboard widget.
        """
        projects = Project.objects.filter(
            memberships__user=request.user,
            memberships__status=ProjectMembership.Status.PENDING
        )
        serializer = ProjectListSerializer(projects, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def respond_invite(self, request, pk=None):
        """
        Accept or Reject an invite.
        Body: { "status": "active" } or { "status": "rejected" }
        """
        project = self.get_object()
        status_action = request.data.get('status') 

        # We manually query ProjectMembership to ensure we find the *specific* # invite for this user on this project.
        membership = get_object_or_404(
            ProjectMembership, 
            project=project, 
            user=request.user,
            status=ProjectMembership.Status.PENDING
        )

        if status_action == 'active':
            membership.status = ProjectMembership.Status.ACTIVE
            membership.save()
            return Response({'status': 'accepted'})
        
        elif status_action == 'rejected':
            membership.delete() 
            return Response({'status': 'rejected'})
            
        return Response({'error': 'Invalid status'}, status=400)
    
    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        """
        Returns the detailed list of members for the settings page.
        """
        project = self.get_object()
        memberships = project.memberships.all().select_related('user', 'user__profile')
        
        serializer = ProjectMembershipSerializer(
            memberships, 
            many=True, 
            context={'request': request}
        )
        return Response(serializer.data)

    @action(detail=True, methods=['delete'], url_path='members/(?P<membership_id>[^/.]+)')
    def remove_member(self, request, pk=None, membership_id=None):
        """
        Removes a member from the project.
        URL: DELETE /api/projects/{id}/members/{membership_id}/
        """
        project = self.get_object()
        
        # Security: Only Owner can kick
        if project.owner != request.user:
            return Response(
                {"error": "Only the project owner can revoke access."}, 
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            membership = project.memberships.get(id=membership_id)
            
            # Safety: Owner cannot delete themselves via this endpoint
            if membership.user == project.owner:
                return Response(
                    {"error": "You cannot remove yourself as the owner."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            membership.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ProjectMembership.DoesNotExist:
            return Response(
                {"error": "Membership record not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )

class ProjectChatViewSet(viewsets.ModelViewSet):
    """
    Handles Project Comments.
    
    Uses Query Params for filtering rather than nested URLs for simplicity.
    URL: /api/projects/comments/?project=<id>
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectCommentSerializer

    def get_queryset(self):
        """
        Filters comments by the 'project' query parameter.
        """
        queryset = ProjectComment.objects.all()
        project_id = self.request.query_params.get('project')
        
        if project_id:
            return queryset.filter(project_id=project_id)
            
        return queryset

    def perform_create(self, serializer):
        """
        Associates the comment with the project provided in the POST body
        and the current user.
        """
        # We assume the 'project' ID is sent in the request body
        # The serializer validates that 'project' exists.
        serializer.save(author=self.request.user)

