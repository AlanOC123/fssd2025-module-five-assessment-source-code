from django.db import models
from apps.projects.models import Project
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Notification(models.Model):
    class NotificationTypes(models.TextChoices):
        PROJECT_INVITE = "project_invite", "Project Invitation"
        NEW_COMMENT = "new_comment", "New Comment"
        TASK_ASSIGNED = "task_assigned", "Task Assigned"

    recipient = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    actor = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_notifications"
    )

    notification_type = models.CharField(choices=NotificationTypes, max_length=20)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self) -> str:
        return f'{self.actor} -> {self.recipient}: {self.notification_type}'

