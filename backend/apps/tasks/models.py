from django.db import models
from apps.users.models import UserProfile
from apps.projects.models import Project

class Task(models.Model):
    # 1. Core Info
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        related_name="tasks"
    )
    
    assigned_to = models.ForeignKey(
        UserProfile, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="assigned_tasks"
    )

    is_completed = models.BooleanField(default=False)
    completed_by = models.ForeignKey(
        UserProfile, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="completed_tasks"
    )
    completed_at = models.DateTimeField(null=True, blank=True)
    
    due_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['due_date'] 

    def __str__(self):
        return self.title