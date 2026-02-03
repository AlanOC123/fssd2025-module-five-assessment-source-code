from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import ChatMessage
from .serializers import ChatMessageSerializer

class ChatMessageViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for managing project chat messages.

    This ViewSet handles the full CRUD lifecycle for messages but is primarily
    used for Listing (Fetching history) and Creating (Sending messages).

    Attributes:
        permission_classes (list): Only authenticated users can chat.
        filter_backends (list): Enables declarative filtering by query params.
        filterset_fields (list): Allows ?project=<id> to scope the chat history.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChatMessageSerializer
    queryset = ChatMessage.objects.all()
    
    # Enables easy filtering by project ID via: /api/chat/?project=123
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project']

    def perform_create(self, serializer):
        """
        Intercepts the save process to automatically associate the current user 
        as the author of the message.
        
        This prevents users from spoofing the author ID in the POST payload.
        """
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], url_path='react')
    def toggle_reaction(self, request, pk=None):
        """
        Toggles a reaction (emoji) for the current user on a specific message.
        Designed to be extensible with different emojis but just went with thumbs up for MVP.

        Design Pattern - NoSQL in SQL:
        Instead of managing a separate M2M table for reactions, we manipulate
        a JSON structure directly. This logic handles the "Toggle" state:
        - If the user has already reacted with this emoji -> Remove it.
        - If the user has NOT reacted -> Add their ID.

        Args:
            request (Request): Contains {"emoji": "👍"} in the body.
            pk (int): The ID of the message to react to.

        Returns:
            Response: The updated message object with the new reaction state.
        """
        message = self.get_object()
        emoji = request.data.get('emoji')
        user_id = request.user.id

        if not emoji:
            return Response(
                {"error": "Emoji is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Ensure we are working with a mutable dictionary
        reactions = message.reactions or {}
        
        # Get the list of user IDs who have clicked this specific emoji
        user_list = reactions.get(emoji, [])

        if user_id in user_list:
            # TOGGLE OFF: User already reacted, so we remove them.
            user_list.remove(user_id)
            
            # Cleanup: If no one else has used this emoji, remove the key entirely
            if not user_list:
                reactions.pop(emoji, None)
            else:
                reactions[emoji] = user_list
        else:
            # TOGGLE ON: User hasn't reacted, so we add them.
            user_list.append(user_id)
            reactions[emoji] = user_list

        # Save the updated JSON blob back to the database
        message.reactions = reactions
        message.save()

        # Return the full message so the UI can optimistically update the specific row
        return Response(
            ChatMessageSerializer(message).data, 
            status=status.HTTP_200_OK
        )