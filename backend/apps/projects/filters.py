import django_filters
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    is_pinned = django_filters.BooleanFilter(method="filter_is_pinned")

    status = django_filters.CharFilter(lookup_expr="iexact")

    class Meta:
        model = Project
        fields = ["status", "is_pinned"]
    
    def filter_is_pinned(self, queryset, name, value):
        user = self.request.user

        if value is True:
            return queryset.filter(pinned_by__user=user)
        
        elif value is False:
            return queryset.exclude(pinned_by__user=user)
        
        return queryset