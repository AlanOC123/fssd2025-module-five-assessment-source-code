from django.contrib import admin
from .models import Project, ProjectMembership, PinnedProject, ProjectComment

class ProjectMembershipInline(admin.TabularInline):
    """
    Inline admin to manage members directly inside the Project details page.
    
    Why this matters:
    Instead of navigating to a separate 'Memberships' table, an admin can 
    open a Project and see/add/remove all members in a simple spreadsheet view.
    """
    model = ProjectMembership
    extra = 0  # Prevents showing 3 empty rows by default; keeps the UI clean
    
    # Optimization: Uses a search box instead of a dropdown for users.
    # Critical for performance if you have thousands of users.
    autocomplete_fields = ['user']
    
    fields = ('user', 'invite_email', 'status', 'access_level', 'date_sent')
    readonly_fields = ('date_sent',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin View for Projects.
    """
    list_display = ("title", "get_status_badge", "owner", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("title", "description", "owner__email")
    
    # Enables the search box for the 'owner' field
    autocomplete_fields = ["owner"]
    
    # Embeds the membership list directly into this page
    inlines = [ProjectMembershipInline]
    
    # Optional: Visual touch to color-code status in the list
    def get_status_badge(self, obj):
        return f"{obj.status.upper()}"
    get_status_badge.short_description = 'Status'

@admin.register(ProjectMembership)
class ProjectMembershipAdmin(admin.ModelAdmin):
    """
    Separate Admin View for Memberships.
    Useful for auditing: "Show me all Pending invites across the system."
    """
    list_display = ("project", "get_email", "status", "access_level", "date_sent")
    list_filter = ("status", "access_level", "project")
    search_fields = ("project__title", "user__email", "invite_email")
    
    def get_email(self, obj):
        """
        Custom helper to show the email regardless of whether it's 
        a registered user or a raw invite string.
        """
        if obj.user:
            return f"{obj.user.email} (User)"
        return f"{obj.invite_email} (Invite)"
    
    get_email.short_description = 'Member Email'

# Register other utility models for completeness
admin.site.register(PinnedProject)
admin.site.register(ProjectComment)