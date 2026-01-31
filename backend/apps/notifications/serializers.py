from apps.users.serializers import UserProfileSerializer
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    actor_detail = UserProfileSerializer(source="actor", read_only=True)
    
    notification_data = serializers.SerializerMethodField()

    class Meta:
        model = Notification

        fields = [
            'id', 
            'notification_type', 
            'actor_detail', 
            'is_read', 
            'created_at', 
            'notification_data'
        ]

    def get_notification_data(self, obj: Notification):
        target = obj.content_object

        if obj.notification_type == "new_comment" and target:
            return {
                'preview': target.content[:50],
                "project_id": target.project.id,
                "project_title": target.project.title
            }
        
        elif obj.notification_type == "project_invite" and target:
            return {
                'invite_id': target.id,
                'project_title': target.project.title,
                'status': target.status
            }
        
        elif obj.notification_type == "task_assigned" and target:
            return {
                "task_id": target.id,
                "task_title": target.title,
                "project_id": target.project.id
            }
        
        return {}

