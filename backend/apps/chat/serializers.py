from rest_framework import serializers
from .models import ChatMessage
from apps.users.serializers import UserProfileSerializer

class ChatMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for ChatMessage objects.

    Design Pattern - Data Enrichment:
    We include `author_detail` (a nested UserProfileSerializer) alongside the 
    standard `author` ID. This provides the frontend with immediate access to 
    the sender's avatar and full name, which is critical for rendering a 
    chat interface efficiently (preventing the "N+1" request problem).

    Attributes:
        author_detail (dict): Read-only nested object containing profile info.
    """

    # We source this from 'author.profile' to get the rich data (Avatar, Name)
    # instead of just the User ID.
    author_detail = UserProfileSerializer(source='author.profile', read_only=True)

    class Meta:
        model = ChatMessage
        fields = [
            'id', 
            'project', 
            'author', 
            'author_detail', # The enriched data
            'content', 
            'reactions', 
            'created_at', 
            'updated_at'
        ]

        # Security: The author is set automatically by the view based on request.user
        read_only_fields = ['author', 'created_at', 'updated_at']

    def validate_reactions(self, value):
        """
        Simple isinstance check for data type. Validates the structure of the JSONField.

        Since JSONFields are schema-less by default, we must enforce strict types 
        at the application layer to prevent the frontend from crashing if 
        malformed data (e.g., a list instead of a dict) is saved.

        Args:
            value: The input data for reactions.

        Returns:
            dict: The validated dictionary.
        """
        if not isinstance(value, dict):
            raise serializers.ValidationError("Reactions must be a dictionary.")

        return value