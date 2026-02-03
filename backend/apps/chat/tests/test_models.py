from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.chat.models import ChatMessage
from apps.projects.models import Project
from django.utils import timezone

User = get_user_model()

class ChatMessageModelTest(TestCase):
    
    def setUp(self):
        """
        Set up the dependencies: A User and a Project.
        """
        self.user = User.objects.create_user(username='chatuser', password='password')
        
        self.project = Project.objects.create(
            title="Chat Project",
            owner=self.user,
            start_date=timezone.now().date(),
            end_date=timezone.now().date()
        )

    def test_message_creation_defaults(self):
        """
        Test that a message initializes with correct defaults (empty reactions).
        """
        message = ChatMessage.objects.create(
            project=self.project,
            author=self.user,
            content="Hello World"
        )
        
        # Check standard fields
        self.assertEqual(message.content, "Hello World")
        self.assertEqual(message.project, self.project)
        
        # CRITICAL: Check JSONField default
        # If this is None or a string, the frontend will crash.
        self.assertEqual(message.reactions, {}) 
        self.assertIsInstance(message.reactions, dict)

    def test_string_representation(self):
        """
        Test that __str__ returns 'Username: Content...' and handles truncation.
        """
        long_content = "This is a very long message that should be truncated in the admin panel view."
        message = ChatMessage.objects.create(
            project=self.project,
            author=self.user,
            content=long_content
        )
        
        expected_str = f"chatuser: {long_content[:20]}"
        self.assertEqual(str(message), expected_str)

    def test_saving_reactions(self):
        """
        Test that we can save a structured dictionary into the reactions field.
        """
        reaction_data = {
            "thumbs_up": [self.user.id],
            "heart": []
        }
        
        message = ChatMessage.objects.create(
            project=self.project,
            author=self.user,
            content="React to this!",
            reactions=reaction_data
        )
        
        # Reload from DB to ensure JSON serialization worked
        message.refresh_from_db()
        
        self.assertEqual(message.reactions['thumbs_up'], [self.user.id])
        self.assertIn('heart', message.reactions)