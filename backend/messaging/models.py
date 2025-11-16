from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class NotificationType(models.TextChoices):
    """Defines the available types of notificationd available"""
    MENTION = "MENTION", "Mention"
    ASSIGNMENT = "ASSIGNMENT", "Assignment",
    OVERDUE = "OVERDUE", "Overdue"

class NotificationStatus(models.TextChoices):
    """Defines the available notification statuses available"""
    UNREAD = "UNREAD", "Unread",
    READ = "READ", "Read",
    STARRED = "STARRED", "Starred"

# class NotificationCategory(models.TextChoices):
#     """Defines the available notification categories available"""
#     UNREAD = "UNREAD", "Unread",
#     READ = "READ", "Read",
#     STARRED = "STARRED", "Starred"

class Notification(models.Model):
    """Notification model defines the type, structure and delivery of notifications throughout the app"""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    status = models.CharField(
        verbose_name="Status",
        choices=NotificationStatus.choices,
        default=NotificationStatus.UNREAD,
        max_length=15
    )

    type = models.CharField(
        verbose_name="Type",
        choices=NotificationType.choices,
        max_length=25
    )

    created_at = models.DateTimeField(auto_now_add=True)

    link_to = models.URLField(
        verbose_name="Link",
        null=True,
        blank=True
    )

    message = models.TextField()

    # method
