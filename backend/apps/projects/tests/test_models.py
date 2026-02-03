from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.utils import timezone
from apps.projects.models import Project, ProjectMembership, PinnedProject, ProjectComment

User = get_user_model()

class ProjectModelTest(TestCase):

    def setUp(self):
        self.owner = User.objects.create_user(username='owner', password='password')
        self.member = User.objects.create_user(username='member', password='password')

    def test_project_creation_defaults(self):
        """
        Test that a project is created with the correct default status (PENDING).
        """
        project = Project.objects.create(
            title="New App",
            owner=self.owner,
            description="Test Description"
        )
        
        self.assertEqual(project.status, Project.ProjectStatus.PENDING)
        self.assertEqual(str(project), "New App")
        self.assertEqual(project.owner, self.owner)

    def test_membership_creation(self):
        """
        Test creating a membership record manually (Simulating an invite).
        """
        project = Project.objects.create(title="Collab", owner=self.owner)
        
        membership = ProjectMembership.objects.create(
            user=self.member,
            project=project,
            status=ProjectMembership.Status.PENDING,
            access_level=ProjectMembership.AccessLevel.VIEWER
        )
        
        self.assertEqual(membership.status, 'pending')
        self.assertEqual(membership.access_level, 'viewer')

    def test_duplicate_membership_prevention(self):
        """
        Test that unique_together works: A user cannot be added twice to the same project.
        """
        project = Project.objects.create(title="Unique", owner=self.owner)
        
        # Create first membership
        ProjectMembership.objects.create(
            user=self.member,
            project=project
        )
        
        # Try to create exact same membership -> Should raise IntegrityError
        with self.assertRaises(IntegrityError):
            ProjectMembership.objects.create(
                user=self.member,
                project=project
            )

class PinnedProjectTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='pinner', password='password')
        self.project = Project.objects.create(title="Pinned", owner=self.user)

    def test_pinning_project(self):
        """
        Test creating a pin record.
        """
        pin = PinnedProject.objects.create(
            user=self.user,
            project=self.project
        )
        
        self.assertEqual(PinnedProject.objects.count(), 1)
        self.assertEqual(pin.user, self.user)

class ProjectCommentTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='talker', password='password')
        self.project = Project.objects.create(title="Discussion", owner=self.user)

    def test_comment_creation(self):
        comment = ProjectComment.objects.create(
            project=self.project,
            author=self.user,
            content="This is a comment"
        )
        
        self.assertEqual(str(comment), f"Comment by {self.user} on {self.project}")