from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.chat.models import ChatMessage
from apps.projects.models import Project
from django.utils import timezone

User = get_user_model()

class ChatMessageViewSetTest(APITestCase):

    def setUp(self):
        # 1. Create Users
        self.user_a = User.objects.create_user(username='user_a', password='password')
        self.user_b = User.objects.create_user(username='user_b', password='password')

        # 2. Create Projects
        self.project_1 = Project.objects.create(
            title="Project One",
            owner=self.user_a,
            start_date=timezone.now().date(),
            end_date=timezone.now().date()
        )
        self.project_2 = Project.objects.create(
            title="Project Two",
            owner=self.user_b, # Owned by User B
            start_date=timezone.now().date(),
            end_date=timezone.now().date()
        )

        # 3. Create Initial Messages
        self.msg_p1 = ChatMessage.objects.create(
            project=self.project_1,
            author=self.user_a,
            content="Message in Project 1"
        )
        self.msg_p2 = ChatMessage.objects.create(
            project=self.project_2,
            author=self.user_b,
            content="Message in Project 2"
        )

        # 4. Authenticate as User A
        self.client.force_authenticate(user=self.user_a)

    def test_create_message_assigns_author(self):
        """
        Test that posting a message automatically assigns the logged-in user 
        as the author, ignoring any 'author' field sent in the body.
        """
        url = reverse('chat-list')
        data = {
            "project": self.project_1.id,
            "content": "New Message",
            "author": self.user_b.id # Try to spoof User B
        }
        
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify in DB
        new_msg = ChatMessage.objects.get(id=response.data['id'])
        self.assertEqual(new_msg.content, "New Message")
        self.assertEqual(new_msg.author, self.user_a) # Should be User A (me), not B

    def test_filter_messages_by_project(self):
            """
            Test that ?project=<id> correctly filters the list.
            """
            # Request messages for Project 1 ONLY
            url = reverse('chat-list') + f'?project={self.project_1.id}'
            response = self.client.get(url)
            
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            
            # FIX: Chat API returns a raw list (no pagination configured), so we use it directly.
            results = response.data
            
            # Should see Project 1's message
            self.assertEqual(len(results), 1)
            self.assertEqual(results[0]['content'], "Message in Project 1")
            
            # Should NOT see Project 2's message
            ids = [m['id'] for m in results]
            self.assertNotIn(self.msg_p2.id, ids)

    def test_toggle_reaction_logic(self):
        """
        Test the custom 'toggle_reaction' action.
        Scenario: 
        1. Add 'rocket' -> Should add user ID.
        2. Add 'rocket' again -> Should REMOVE user ID (Toggle).
        """
        url = reverse('chat-toggle-reaction', kwargs={'pk': self.msg_p1.id})
        data = {"emoji": "👍"}

        # --- Step 1: Add Reaction ---
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that user_a is in the list
        self.assertIn(self.user_a.id, response.data['reactions']['👍'])

        # --- Step 2: Remove Reaction (Toggle) ---
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that the key is gone (or empty)
        if '🚀' in response.data['reactions']:
            self.assertEqual(response.data['reactions']['👍'], [])
        else:
            self.assertNotIn('👍', response.data['reactions'])

    def test_unauthenticated_access(self):
        """
        Ensure anonymous users cannot read or write chat.
        """
        self.client.force_authenticate(user=None) # Logout
        
        url = reverse('chat-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)