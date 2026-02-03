from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.notifications.models import Notification
from apps.projects.models import Project
from django.utils import timezone

User = get_user_model()

class NotificationModelTest(TestCase):
    
    def setUp(self):
        # Create a user to be the recipient
        self.user = User.objects.create_user(username='notifuser', password='password')
        
        # Optional: Create a project as some notifications are project related
        self.project = Project.objects.create(
            title="Test Project",
            owner=self.user,
            start_date=timezone.now().date(),
            end_date=timezone.now().date()
        )

    def test_notification_creation_defaults(self):
        """
        Test that a notification is created with is_read=False by default
        """
        notification = Notification.objects.create(
            recipient=self.user,
            notification_type='task_overdue',
            message="You have a task overdue"
        )
        
        # Check that it saved
        self.assertEqual(Notification.objects.count(), 1)
        
        # Check Default Value
        self.assertFalse(notification.is_read)
        
        # Check Data Integrity
        self.assertEqual(notification.recipient.username, 'notifuser')

    def test_notification_str_method(self):
        """
        Test the string representation (what shows up in Django Admin)
        """
        notification = Notification.objects.create(
            recipient=self.user,
            notification_type='project_invite',
            message="You are invited"
        )

        expected_str = f"Notification for {self.user.username}" 
        self.assertEqual(str(notification), expected_str)