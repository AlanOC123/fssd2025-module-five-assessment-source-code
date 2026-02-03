from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.projects.models import Project, ProjectMembership, PinnedProject

User = get_user_model()

class ProjectViewSetTest(APITestCase):

    def setUp(self):
        # 1. Create Users
        self.owner = User.objects.create_user(username='owner', email='owner@example.com', password='password')
        self.member = User.objects.create_user(username='member', email='member@example.com', password='password')
        self.outsider = User.objects.create_user(username='outsider', email='out@example.com', password='password')

        # 2. Create Project owned by 'owner'
        self.project = Project.objects.create(
            title="Alpha Project",
            owner=self.owner,
            status=Project.ProjectStatus.ACTIVE
        )

        # 3. Add 'member' to the project (Active)
        ProjectMembership.objects.create(
            project=self.project,
            user=self.member,
            status=ProjectMembership.Status.ACTIVE,
            access_level=ProjectMembership.AccessLevel.VIEWER
        )

        # 4. Default login: Owner
        self.client.force_authenticate(user=self.owner)

    def test_list_projects_authenticated(self):
        """
        Test that authenticated users can see projects they own or joined.
        """
        url = reverse('project-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Determine if response is paginated or a raw list
        data = response.data.get('results', response.data) if isinstance(response.data, dict) else response.data
        
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], "Alpha Project")

    def test_outsider_cannot_see_project(self):
        """
        Security Test: A user NOT in the project gets an empty list.
        """
        self.client.force_authenticate(user=self.outsider)
        url = reverse('project-list')
        response = self.client.get(url)
        
        data = response.data.get('results', response.data) if isinstance(response.data, dict) else response.data
        self.assertEqual(len(data), 0)

    def test_create_project(self):
        """
        Test creating a new project via API.
        """
        url = reverse('project-list')
        data = {
            "title": "Beta Project",
            "description": "New Description",
            "status": "pending"
        }
        response = self.client.post(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)
        self.assertEqual(Project.objects.last().owner, self.owner)

    def test_pin_project_action(self):
        """
        Test the custom @action to pin a project.
        """
        url = reverse('project-pin', kwargs={'pk': self.project.id})
        
        # 1. Pin
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['is_pinned'])
        self.assertTrue(PinnedProject.objects.filter(user=self.owner, project=self.project).exists())

        # 2. Unpin (Toggle)
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data['is_pinned'])

    def test_invite_member_flow(self):
        """
        Test the full invitation flow: Invite -> Create Pending Record.
        """
        url = reverse('project-invite-member', kwargs={'pk': self.project.id})
        data = {"email": "out@example.com"} # Inviting the outsider

        response = self.client.post(url, data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify Pending Membership created
        membership = ProjectMembership.objects.get(project=self.project, user=self.outsider)
        self.assertEqual(membership.status, ProjectMembership.Status.PENDING)

    def test_respond_to_invite(self):
        """
        Test accepting an invite.
        """
        # 1. Setup: Create a pending invite for 'outsider'
        ProjectMembership.objects.create(
            project=self.project,
            user=self.outsider,
            status=ProjectMembership.Status.PENDING
        )
        
        # 2. Switch login to 'outsider'
        self.client.force_authenticate(user=self.outsider)
        
        # 3. Accept Invite
        url = reverse('project-respond-invite', kwargs={'pk': self.project.id})
        response = self.client.post(url, {"status": "active"})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify status changed to ACTIVE
        membership = ProjectMembership.objects.get(project=self.project, user=self.outsider)
        self.assertEqual(membership.status, ProjectMembership.Status.ACTIVE)

    def test_filter_by_status(self):
        """
        Test filtering ?status=active.
        """
        # Create a second archived project
        Project.objects.create(title="Old", owner=self.owner, status="archived")
        
        url = reverse('project-list') + '?status=active'
        response = self.client.get(url)
        
        data = response.data.get('results', response.data) if isinstance(response.data, dict) else response.data
        
        # Should only find "Alpha Project", not "Old"
        # Note: If your API is paginated, adjust expectation logic if needed, 
        # but filtering should return 1 result here.
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], "Alpha Project")