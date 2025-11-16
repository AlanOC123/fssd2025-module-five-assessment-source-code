from rest_framework import serializers
from .models import Notification
from directory.serializers import UserSerializer

class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            'user', 'status', 'created_at'
            'message'
        ]