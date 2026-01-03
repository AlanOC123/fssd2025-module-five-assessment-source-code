from django.contrib import admin
from .models import Project

# Register your models here.
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "status", "owner", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("title", "description")
    autocomplete_fields = ["owner"]