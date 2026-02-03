from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.tasks.models import Task
from apps.notifications.models import Notification

class Command(BaseCommand):
    help = 'Checks for overdue tasks and notifies assignees'

    def handle(self, *args, **kwargs):
        now = timezone.now()
        
        # Filter for tasks that are overdue, incomplete, and NOT YET notified
        overdue_tasks = Task.objects.filter(
            due_date__lt=now,
            is_completed=False,
            overdue_notified=False # <--- Critical check
        )

        count = 0
        for task in overdue_tasks:
            if task.assigned_to:
                Notification.objects.create(
                    recipient=task.assigned_to.user,
                    notification_type=Notification.Type.TASK_OVERDUE,
                    message=f"Task '{task.title}' is overdue",
                    project=task.project
                )
                
                # Mark as notified so we don't send this again
                task.overdue_notified = True
                task.save()
                count += 1
                
        self.stdout.write(self.style.SUCCESS(f"Sent notifications for {count} tasks"))