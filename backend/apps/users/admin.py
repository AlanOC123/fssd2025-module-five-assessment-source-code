from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()

class UserProfileInline(admin.StackedInline):
    """
    Displays the UserProfile fields (Avatar, Bio, DOB) directly 
    inside the standard Django User edit page.
    """
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class UserAdmin(BaseUserAdmin):
    """
    Extended User Admin.
    
    Improvements:
    1. Inlines the Profile model.
    2. Enables global search (Required for autocomplete widgets in other apps).
    """
    # 1. Search Fields
    # This enables 'autocomplete_fields' to work in ProjectMembershipAdmin.
    search_fields = ['username', 'email', 'first_name', 'last_name']

    def get_inlines(self, request, obj=None):
        """
        Only show the Profile inline if the User object already exists.
        
        Why? 
        When creating a *new* user, the User instance isn't saved yet, 
        so we can't link a Profile to it immediately. This prevents a crash 
        during the "Add User" screen.
        """
        if not obj:
            return []
        
        return [UserProfileInline]

# Unregister the default User admin configuration
admin.site.unregister(User)

# Register our enhanced version
admin.site.register(User, UserAdmin)
