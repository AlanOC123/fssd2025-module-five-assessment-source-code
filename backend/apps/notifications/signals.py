from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.projects.models import ProjectComment
from .models import Notification

@receiver(post_save, sender=ProjectComment)
def notify_project_comment(sender, instance, created, **kwargs):
    if (created):
        project = instance.project
        author = instance.author

        members_to_notify = project.members.exclude(id=author.id)

        notifications = []

        for member in members_to_notify:
            notifications.append(
                Notification(
                    recipient = member,
                    actor=author,
                    notication_type=Notification.NotificationTypes.NEW_COMMENT,
                    content_object=instance
                )
            )

        Notification.objects.bulk_create(notifications)