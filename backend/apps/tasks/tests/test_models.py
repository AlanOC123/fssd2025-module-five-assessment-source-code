from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.tasks.models import Task
from apps.projects.models import Project
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class TaskModelTest(TestCase):
    
    def setUp(self):
        # 1. Create a User (and their profile)
        self.user = User.objects.create_user(username='taskmaster', password='password')
        self.profile = self.user.profile # Access the automatically created profile
        
        # 2. Create a Project context
        self.project = Project.objects.create(
            title="Task Project",
            owner=self.user,
            start_date=timezone.now().date()
        )

    def test_task_creation_defaults(self):
        """
        Test that a task creates successfully with expected default values.
        """
        task = Task.objects.create(
            title="Write Tests",
            project=self.project,
            assigned_to=self.profile,
            due_date=timezone.now().date()
        )
        
        self.assertEqual(str(task), "Write Tests")
        self.assertFalse(task.is_completed)
        self.assertFalse(task.overdue_notified) # Background worker flag should be False
        self.assertEqual(task.assigned_to, self.profile)

    def test_task_ordering(self):
        """
        Test that tasks are automatically ordered by due_date (Sooner -> Later).
        """
        today = timezone.now().date()
        tomorrow = today + timedelta(days=1)
        
        # Create 'Later' task first
        t2 = Task.objects.create(title="Later", project=self.project, due_date=tomorrow)
        
        # Create 'Sooner' task second
        t1 = Task.objects.create(title="Sooner", project=self.project, due_date=today)
        
        # Fetch all tasks
        tasks = list(Task.objects.all())
        
        # Verify t1 comes before t2 despite creation order
        self.assertEqual(tasks[0], t1)
        self.assertEqual(tasks[1], t2)