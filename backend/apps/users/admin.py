from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class UserAdmin(BaseUserAdmin):
    def get_inlines(self, request, obj=None):
        if not obj:
            return []
        
        return [UserProfileInline]

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
