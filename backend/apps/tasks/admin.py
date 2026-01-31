from django.contrib import admin
from .models import Task

# Register your models here.
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "is_completed", "assigned_to", "created_at")
    list_filter = ("is_completed", "created_at")
    search_fields = ("title", "description")