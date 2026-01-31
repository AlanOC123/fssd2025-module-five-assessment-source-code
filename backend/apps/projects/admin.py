from django.contrib import admin
from .models import Project, ProjectMembership

class ProjectMembershipInline(admin.TabularInline):
    model = ProjectMembership
    extra = 1  # Shows one empty row by default
    autocomplete_fields = ['user']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "status", "owner", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("title", "description")
    autocomplete_fields = ["owner"]
    inlines = [ProjectMembershipInline]