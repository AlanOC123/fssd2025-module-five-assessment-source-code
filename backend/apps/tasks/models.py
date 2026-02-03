from django.db import models
from apps.users.models import UserProfile
from apps.projects.models import Project

class Task(models.Model):
    """
    Represents an individual unit of work within a Project.

    The Task model tracks the lifecycle of a deliverable, including its 
    assignment, deadline, and completion status.

    Attributes:
        project (Project): The parent project context.
        assigned_to (UserProfile): The user responsible for the task.
        is_completed (bool): Tracks the current status.
        completed_by (UserProfile): Tracks who finished the task (for auditing).
        overdue_notified (bool): Flag used by the 'check_overdue' management 
                                 command to prevent duplicate alerts.
    """

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        related_name="tasks",
        help_text="The project this task is grouped under."
    )
    
    # We link to UserProfile rather than User to stay consistent with 
    # UI-heavy features (like showing avatars in the task list).
    assigned_to = models.ForeignKey(
        UserProfile, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="assigned_tasks"
    )

    is_completed = models.BooleanField(default=False)
    
    # Audit Field: Even if the task is reassigned later, we want to know 
    # who actually marked it as complete.
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

    # Logic Flag: Used by background workers to identify tasks that have 
    # already triggered an 'Overdue' notification to avoid spamming users.
    overdue_notified = models.BooleanField(
        default=False, 
        help_text="System field to track if the assignee has been alerted of a late deadline."
    )

    class Meta:
        # Tasks are ordered by deadline: Most urgent first.
        ordering = ['due_date'] 

    def __str__(self):
        return self.title