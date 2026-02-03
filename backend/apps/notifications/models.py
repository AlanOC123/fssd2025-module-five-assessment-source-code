from django.db import models
from django.conf import settings
from apps.projects.models import Project

class Notification(models.Model):
    """
    Represents a system notification sent to a specific user.

    This model aggregates alerts from various parts of the system (Projects, Tasks, Invites).
    Instead of using a complex GenericForeignKey, it maintains a direct optional link 
    to a `Project`, as the majority of system events are project-scoped.

    Attributes:
        recipient (User): The user who will receive the alert.
        actor (User): The user who triggered the event (optional).
        notification_type (str): The category of event (used for UI icons/routing).
        project (Project): The context of the notification (optional).
        message (str): A static snapshot of the alert text.
        is_read (bool): Read receipt status.
    """

    class Type(models.TextChoices):
        """Enumeration of all supported notification categories."""
        PROJECT_INVITE = "project_invite", "Project Invitation"
        INVITE_ACCEPTED = "invite_accepted", "Invitation Accepted"
        INVITE_REJECTED = "invite_rejected", "Invitation Rejected"
        PROJECT_COMPLETED = "project_completed", "Project Completed"
        TASK_OVERDUE = "task_overdue", "Task Overdue"
        REMOVED_FROM_PROJECT = "removed", "Removed from Project"

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications",
        help_text="The user who will see this notification in their dashboard."
    )

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL, 
        null=True,
        related_name="sent_notifications",
        help_text="The user who performed the action. If Null, implies a System event."
    )
    
    # Note: If the actor is deleted, we use SET_NULL to preserve the notification history.
    
    notification_type = models.CharField(
        choices=Type.choices, 
        max_length=30,
        help_text="Determines the icon and frontend routing logic."
    )
    
    # Architectural Decision:
    # We link directly to Project instead of using ContentType/GenericForeignKey.
    # This simplifies Serializers and SQL queries since 90% of alerts are project-related.
    project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True
    )
    
    # We store the message as a static string rather than generating it dynamically.
    # This ensures that if a Task title changes later, the old notification 
    # remains historically accurate to what happened at that moment.
    message = models.CharField(max_length=255)
    
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at'] # Newest first by default
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
    
    def __str__(self) -> str:
        return f"Notification for {self.recipient.username}"

