from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Notification model.
    
    This serializer implements a 'Data Flattening' strategy. Instead of returning 
    nested User or Project objects (which would require the frontend to dig deep 
    into the JSON), we extract and flatten only the necessary display fields 
    (name, avatar, title) at the top level.

    Attributes:
        actor_name (str): Computed field returning the actor's full name or email.
        actor_avatar (str): Computed field returning the absolute URL to the avatar.
        project_title (str): Read-only field from the related Project model.
        project_id (int): Read-only ID from the related Project model.
    """

    # Flatten the actor details for easy display in the UI list
    actor_name = serializers.SerializerMethodField()
    actor_avatar = serializers.SerializerMethodField()
    
    # Flatten project details so the frontend doesn't need to traverse relationships
    project_title = serializers.ReadOnlyField(source='project.title')
    project_id = serializers.ReadOnlyField(source='project.id')

    class Meta:
        model = Notification
        fields = [
            'id', 
            'notification_type', 
            'message', 
            'is_read', 
            'created_at', 
            'project_id',
            'project_title',
            'actor_name', 
            'actor_avatar'
        ]

    def get_actor_name(self, obj):
        """
        Resolves the display name for the actor.

        Logic:
            1. If no actor exists (e.g., automated alert), returns 'System'. (Debated creating a system user but found just returning System to be enough for this project.)
            2. If actor has a profile with a name, returns the full name.
            3. Fallback to the actor's email address.

        Args:
            obj (Notification): The notification instance.

        Returns:
            str: The display name.
        """
        if not obj.actor:
            return "System"
            
        # Robust check: Ensure profile exists before accessing attributes
        if hasattr(obj.actor, 'profile'):
            return obj.actor.profile.full_name or obj.actor.email
        return obj.actor.email

    def get_actor_avatar(self, obj):
        """
        Constructs the absolute URL for the actor's avatar.

        This method ensures the URL is complete (including domain/protocol)
        so the frontend can load it directly without path manipulation.

        Args:
            obj (Notification): The notification instance.

        Returns:
            str | None: The absolute URL to the image or None if no avatar exists.
        """
        if obj.actor and hasattr(obj.actor, 'profile') and obj.actor.profile.avatar:
            request = self.context.get('request')
            if request:
                # build_absolute_uri adds 'http://localhost:8000/...' 
                return request.build_absolute_uri(obj.actor.profile.avatar.url)
            return obj.actor.profile.avatar.url

        return None