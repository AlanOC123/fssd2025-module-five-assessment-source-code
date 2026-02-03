from rest_framework import permissions
from .models import ProjectMembership, Project

class IsProjectMember(permissions.BasePermission):
    """
    Custom Permission: Limits access to Project resources.

    Rules:
    1. Project Owners have full access (Read/Write/Delete).
    2. Active Members have access based on their role (handled in views).
    3. Pending Members (Invited) have Read-Only access.
       - Logic: They must be able to GET the project details to see what they 
         are being invited to, but they cannot Edit/Delete until they accept.
    4. Non-members are denied entirely (403 Forbidden).
    """

    def has_object_permission(self, request, view, obj: Project):
        """
        Checks if the user has rights to access the specific Project instance.
        """
        # 1. Super-Admin / Owner Override
        # The owner always has full control regardless of membership status.
        if obj.owner == request.user:
            return True
        
        try:
            # 2. Check Membership Existence
            # We look for a direct link between the user and the project.
            membership = ProjectMembership.objects.get(
                project=obj, 
                user=request.user
            )

            # 3. Handle 'Pending' Invites
            # If the user hasn't accepted yet, we restrict them to Read-Only (GET).
            # This prevents them from posting tasks/comments until they officially join.
            if membership.status == ProjectMembership.Status.PENDING:
                if view.action == 'respond_invite':
                    return True
                
                # Otherwise, restrict to Read-Only
                return request.method in permissions.SAFE_METHODS

            # 4. Active Members
            # If they exist and are not pending, they are allowed in.
            # (Fine-grained role checks like 'Editor vs Viewer' happen in the View or Serializer)
            return True

        except ProjectMembership.DoesNotExist:
            # User has no relationship to this project at all -> Deny Access
            return False

