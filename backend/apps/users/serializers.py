from rest_framework import serializers
from django.contrib.auth.models import User
from apps.users.models import UserProfile
from typing import cast, TYPE_CHECKING, Dict, Any
from dj_rest_auth.registration.serializers import RegisterSerializer

# Type Hinting Block:
# This ensures IDEs (VS Code/PyCharm) understand the relationship between User 
# and Profile without causing circular import errors at runtime.
if TYPE_CHECKING:
    class UserWithProfile(User):
        profile: UserProfile

        class Meta:
            abstract = True
else:
    UserWithProfile = User

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.

    Design Choice - Flattening Data:
    Instead of nesting the User object (which would look like { profile: { user: { email: ... } } }),
    I 'flattened' the critical user fields (email, id) directly onto the profile object. To make the frontend cleaner.
    """
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    user_id = serializers.IntegerField(source="user.pk", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    avatar = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
            model = UserProfile
            fields = [
                "id", "user_id", "email", 
                "first_name", "last_name", 
                "date_of_birth", "avatar"
            ]
            read_only_fields = ["email", "user_id"]

    def to_representation(self, instance):
        """
        Required to ensure User model is the source of truth for the first name and last name attributes.
        """
        data = super().to_representation(instance)
        data['first_name'] = instance.user.first_name
        data['last_name'] = instance.user.last_name

        return data

    def update(self, instance, validated_data):
            print(f"Validated Data (Finally!): {validated_data}")

            user = instance.user
            has_user_changes = False
            
            # Fields that live on the User model
            fields_to_write = ['first_name', 'last_name']

            for field in fields_to_write:
                if field in validated_data:
                    # 1. Update the User model
                    setattr(user, field, validated_data[field])
                    has_user_changes = True

            if has_user_changes:
                user.save()

            # 2. Update Profile Fields (Avatar, DOB, + legacy names)
            return super().update(instance, validated_data)

class UserSerializer(serializers.ModelSerializer):
    """
    Minimal User serializer for authentication responses.
    """
    class Meta:
        model = User
        fields = ["id", "email"]


class CustomRegisterSerializer(RegisterSerializer):
    """
    Custom Registration Serializer.

    This overrides the default 'dj_rest_auth' behavior.
    
    Problem:
    The default library only saves username/password/email.
    
    Solution:
    I added fields for First Name, Last Name, and DOB here. Then, overrided 
    the `save()` method to extract this data and save it to the UserProfile 
    immediately after the User is created.
    """
    username = None # We rely on email as the identifier
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(required=True)

    def get_cleaned_data(self) -> Dict[str, Any]:
        """
        Passes custom fields to the adapter/signal (if used).
        """
        writeable_fields = ["first_name", "last_name", "date_of_birth"]
        data = super().get_cleaned_data()
        val_data = cast(Dict[str, Any], self.validated_data)

        for field in writeable_fields:
            data[field] = val_data.get(field, "")

        return data
    
    def save(self, request) -> Any:
        """
        Save Logic:
        1. Create the User (super().save()).
        2. Ensure Username == Email (Business Rule).
        3. Save the extra profile fields to the UserProfile model.
        """
        writeable_fields = ["first_name", "last_name", "date_of_birth"]
        
        # 1. Create the User
        user: UserWithProfile = super().save(request)

        # 2. Enforce Email as Username
        if user.username != user.email:
            user.username = user.email
            user.save(update_fields=["username"])

        val_data = cast(Dict[str, Any], self.validated_data)

        # 3. Populate and Save the Profile
        # Note: 'user.profile' exists because of the post_save signal in models.py
        for field in writeable_fields:
            value = val_data.get(field, "")
            profile = user.profile
            setattr(profile, field, value)

        user.profile.save()
        return user