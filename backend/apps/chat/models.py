from django.db import models
from django.conf import settings
from apps.projects.models import Project

class ChatMessage(models.Model):
    """
    Represents a single message within a project's communication channel.

    Design Choice - 'Project as Room':
    Instead of creating a separate 'ChatRoom' or 'Channel' model, we associate 
    messages directly with the `Project`. This simplifies the schema for the 
    MVP since each project currently has exactly one global chat.

    Attributes:
        project (Project): The context/room where this message was sent.
        author (User): The sender of the message.
        content (str): The actual text body of the message.
        reactions (dict): A lightweight JSON store for emoji reactions.
        created_at (datetime): Timestamp for sorting the chat stream.
    """

    project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        related_name="chat_messages",
        help_text="The project this message belongs to (acts as the chat room)."
    )
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="chat_messages"
    )
    
    content = models.TextField()
    
    # Architectural Decision: Denormalisation for Performance
    # Instead of a separate 'MessageReaction' model (which would require massive joins 
    # when loading 50 messages), we use a JSONField.
    # Structure: { "thumbs_up": [user_id_1, user_id_2], "heart": [user_id_3] }
    # Trade-off: Querying "who reacted to what" is harder, but reading the chat is much faster.
    reactions = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Chat logs are chronological (Oldest at top, Newest at bottom)
        ordering = ['created_at']

    def __str__(self):
        return f"{self.author.username}: {self.content[:20]}"