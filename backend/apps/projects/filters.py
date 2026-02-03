import django_filters
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    """
    FilterSet for the Project API.

    This class handles complex query parameters that go beyond simple exact matches.
    Specifically, it handles the 'Pinned' logic which is contextual to the 
    currently logged-in user.

    Usage:
        GET /api/projects/?status=active
        GET /api/projects/?is_pinned=true
    """

    # Custom Boolean Filter: "Show me only projects I have pinned"
    # We use a custom method because 'pinned' is not a field on Project, 
    # but a relationship (ProjectPin) that links a User to a Project.
    is_pinned = django_filters.BooleanFilter(method="filter_is_pinned")

    # Case-insensitive status lookup (e.g., 'Active' matches 'active')
    status = django_filters.CharFilter(lookup_expr="iexact")

    class Meta:
        model = Project
        fields = ["status", "is_pinned"]
    
    def filter_is_pinned(self, queryset, name, value):
        """
        Filters the queryset based on whether the current user has pinned the project.

        Args:
            queryset (QuerySet): The initial list of projects.
            name (str): The name of the filter field ('is_pinned').
            value (bool): The value passed in the URL (True/False).
        """
        # We need the request user to know WHOSE pins to check.
        # This requires the view to pass 'request' to the filterset context.
        user = self.request.user

        if value is True:
            # Return projects where a ProjectPin exists for this user
            return queryset.filter(pinned_by__user=user)
        
        elif value is False:
            # Return projects where NO ProjectPin exists for this user
            return queryset.exclude(pinned_by__user=user)
        
        # If value is None, return unmodified queryset
        return queryset