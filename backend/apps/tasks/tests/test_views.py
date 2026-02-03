from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.projects.models import Project, ProjectMembership
from apps.tasks.models import Task
from django.utils import timezone

User = get_user_model()

class TaskViewSetTest(APITestCase):

    def setUp(self):
        # 1. Create Users
        self.owner = User.objects.create_user(username='owner', password='password')
        self.member = User.objects.create_user(username='member', password='password')
        self.outsider = User.objects.create_user(username='outsider', password='password')

        # 2. Create Project
        self.project = Project.objects.create(
            title="Dev Project",
            owner=self.owner,
            start_date=timezone.now().date()
        )

        # 3. Add 'member' to project
        ProjectMembership.objects.create(
            user=self.member,
            project=self.project,
            status=ProjectMembership.Status.ACTIVE
        )

        # 4. Create a Task
        self.task = Task.objects.create(
            title="Fix Bug",
            project=self.project,
            due_date=timezone.now().date()
        )

    def test_security_scope_owner(self):
        """Test that the Project Owner can see the task."""
        self.client.force_authenticate(user=self.owner)
        url = reverse('task-list')
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)

    def test_security_scope_member(self):
        """Test that a Project Member can see the task."""
        self.client.force_authenticate(user=self.member)
        url = reverse('task-list')
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)

    def test_security_scope_outsider(self):
        """Test that a User NOT in the project sees NOTHING."""
        self.client.force_authenticate(user=self.outsider)
        url = reverse('task-list')
        response = self.client.get(url)
        # Should be empty list []
        self.assertEqual(len(response.data), 0)

    def test_create_task(self):
        """Test creating a task via API."""
        self.client.force_authenticate(user=self.owner)
        url = reverse('task-list')
        data = {
            "title": "New Task",
            "project": self.project.id,
            "due_date": timezone.now().date(),
            # assigned_to is optional, so we can omit for this test
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)

    def test_toggle_complete_logic(self):
        """
        Test the custom action:
        1. Toggle ON -> Should set completed_at and completed_by
        2. Toggle OFF -> Should clear them
        """
        self.client.force_authenticate(user=self.member)
        url = reverse('task-toggle-complete', kwargs={'pk': self.task.id})

        # --- Step 1: Mark Complete ---
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.task.refresh_from_db()
        self.assertTrue(self.task.is_completed)
        self.assertIsNotNone(self.task.completed_at)
        self.assertEqual(self.task.completed_by, self.member.profile)

        # --- Step 2: Mark Incomplete (Toggle) ---
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.task.refresh_from_db()
        self.assertFalse(self.task.is_completed)
        self.assertIsNone(self.task.completed_at)
        self.assertIsNone(self.task.completed_by)