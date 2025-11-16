from rest_framework import serializers
from .models import Preference, Note, Theme
from directory.serializers import UserSerializer

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Theme
        fields = [
            'name', 'primary_color', 'secondary_color',
            'tertiary_color', 'text_color'
        ]

class PreferenceSerializer(serializers.ModelSerializer):
    theme = ThemeSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Preference
        fields = ['user', 'theme_mode', 'theme']

class NoteSerializer(serializers.ModelSerializer):
    theme = ThemeSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Note
        fields = ['author', 'title', 'content', 'created_at']