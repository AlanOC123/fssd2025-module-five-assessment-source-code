from django.test import TestCase
from django.utils import timezone
from django.core.management import call_command
from datetime import timedelta
from django.contrib.auth import get_user_model
from apps.projects.models import Project
from apps.tasks.models import Task
from apps.notifications.models import Notification
from apps.users.models import UserProfile

User = get_user_model()

class CheckOverdueCommandTest(TestCase):

    def setUp(self):
        """
        Runs before EVERY test method. 
        """

        # 1. Create a User and Profile
        self.user = User.objects.create_user(username='testuser', password='password')

        # Ensure profile exists
        self.profile, _ = UserProfile.objects.get_or_create(user=self.user)

        # 2. Create a Project
        self.project = Project.objects.create(
            title="Test Project",
            owner=self.user,
            start_date=timezone.now().date(),
            end_date=timezone.now().date() + timedelta(days=5)
        )

    def test_overdue_task_generates_notification(self):
        """
        Scenario: A task is overdue and uncompleted.
        Expected: A notification is created and task.overdue_notified becomes True.
        """
        # 1. Create an overdue task
        task = Task.objects.create(
            title="Late Task",
            project=self.project,
            assigned_to=self.profile,
            due_date=timezone.now().date() - timedelta(days=1), # Due yesterday
            is_completed=False,
            overdue_notified=False
        )

        # 2. Run the command
        call_command('check_overdue')

        # 3. Assertions
        # Check notification count
        self.assertEqual(Notification.objects.count(), 1)
        
        # Check notification content
        notif = Notification.objects.first()
        self.assertEqual(notif.recipient, self.user)
        self.assertEqual(notif.notification_type, 'task_overdue')
        
        # Check task was updated to prevent spam
        task.refresh_from_db() # Reload from DB to get updated fields
        self.assertTrue(task.overdue_notified)

    def test_completed_task_ignored(self):
        """
        Scenario: Task is overdue BUT completed.
        Expected: No notification.
        """
        Task.objects.create(
            title="Done Task",
            project=self.project,
            assigned_to=self.profile,
            due_date=timezone.now().date() - timedelta(days=1),
            is_completed=True, # It is done
            overdue_notified=False
        )

        call_command('check_overdue')
        
        self.assertEqual(Notification.objects.count(), 0)

    def test_idempotency_no_duplicate_notifications(self):
        """
        Scenario: Command runs twice.
        Expected: Notification sent only ONCE.
        """
        task = Task.objects.create(
            title="Double Run Task",
            project=self.project,
            assigned_to=self.profile,
            due_date=timezone.now().date() - timedelta(days=1),
            is_completed=False,
            overdue_notified=False
        )

        # Run 1
        call_command('check_overdue')
        self.assertEqual(Notification.objects.count(), 1)

        # Run 2
        call_command('check_overdue')
        self.assertEqual(Notification.objects.count(), 1)