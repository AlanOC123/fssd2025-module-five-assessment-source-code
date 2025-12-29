from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import UserProfile
from typing import cast, TYPE_CHECKING, Dict, Any
from dj_rest_auth.registration.serializers import RegisterSerializer

if TYPE_CHECKING:
    class UserWithProfile(User):
        profile: UserProfile

        class Meta:
            abstract = True
else:
    UserWithProfile: User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            "first_name", 'last_name', "date_of_birth", 
            "bio", "location", "role", 
            "full_name"
        ]

        read_only_fields = ["full_name"]

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        fields = [
            "id", "email", "profile"
        ]
    
    def update(self, instance: UserWithProfile, validated_data):
        profile_data = validated_data.pop("profile")
        profile: UserProfile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.first_name = profile_data.get('first_name', profile.first_name)
        profile.last_name = profile_data.get('last_name', profile.last_name)
        profile.date_of_birth = profile_data.get('date_of_birth', profile.date_of_birth)
        profile.bio = profile_data.get('bio', profile.bio)
        profile.location = profile_data.get('location', profile.location)
        profile.save()

class CustomRegisterSerilizer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(required=True)

    def get_cleaned_data(self) -> Dict[str, Any]:
        data = super().get_cleaned_data()
        val_data = cast(Dict[str, Any], self.validated_data)
        data['first_name'] = val_data.get('first_name', '')
        data['last_name'] = val_data.get('last_name', '')
        data['date_of_birth'] = val_data.get('date_of_birth', '')
        return data
    
    def save(self, request) -> Any:
        user: UserWithProfile = super().save(request)
        val_data = cast(Dict[str, Any], self.validated_data)

        user.profile.first_name = val_data.get('first_name', '')
        user.profile.last_name = val_data.get('last_name', '')
        user.profile.date_of_birth = val_data.get('date_of_birth', '')

        user.profile.save()