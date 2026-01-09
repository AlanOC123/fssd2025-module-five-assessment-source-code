from rest_framework import serializers
from django.contrib.auth.models import User
from apps.users.models import UserProfile
from typing import cast, TYPE_CHECKING, Dict, Any
from dj_rest_auth.registration.serializers import RegisterSerializer

if TYPE_CHECKING:
    class UserWithProfile(User):
        profile: UserProfile

        class Meta:
            abstract = True
else:
    UserWithProfile = User

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source="user.email", read_only=True)
    class Meta:
        model = UserProfile
        fields = [
            "id", "email", "first_name", 
            'last_name', "date_of_birth",
            "full_name", 'avatar',
        ]

        read_only_fields = ["full_name"]

    def update(self, instance, validated_data):
        writeable_fields = ["first_name", "last_name", "date_of_birth", "avatar"]

        print(validated_data)

        for field in writeable_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])
        
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]

class CustomRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(required=True)

    def get_cleaned_data(self) -> Dict[str, Any]:
        writeable_fields = ["first_name", "last_name", "date_of_birth"]
        data = super().get_cleaned_data()
        val_data = cast(Dict[str, Any], self.validated_data)

        for field in writeable_fields:
            data[field] = val_data.get(field, "")

        return data
    
    def save(self, request) -> Any:
        writeable_fields = ["first_name", "last_name", "date_of_birth"]
        user: UserWithProfile = super().save(request)

        if user.username != user.email:
            user.username = user.email
            user.save(update_fields=["username"])

        val_data = cast(Dict[str, Any], self.validated_data)

        for field in writeable_fields:
            value = val_data.get(field, "")
            profile = user.profile
            setattr(profile, field, value)

        user.profile.save()
        return user