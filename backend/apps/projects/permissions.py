from rest_framework import permissions
from .models import ProjectMembership, Project

class IsProjectMember(permissions.BasePermission):

    def has_object_permission(self, request, view, obj: Project):
        if obj.owner == request.user:
            return True
        
        try:
            membership = ProjectMembership.objects.get(project=obj, user=request.user)

            if membership.status == ProjectMembership.Status.PENDING:
                return request.method in permissions.SAFE_METHODS

            return True
        except:
            ProjectMembership.DoesNotExist
            return False

