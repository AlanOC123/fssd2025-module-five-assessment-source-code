from django.db import models
from django.conf import settings

class Project(models.Model):
    """
    The central container for all work within the application.

    This model represents a workspace where tasks, comments, and members aggregate.
    It uses a custom ManyToMany relationship via 'ProjectMembership' to store
    permission levels and invitation statuses for each member.

    Attributes:
        owner (User): The creator/admin who has full deletion rights.
        members (QuerySet): All users with access (via the intermediate table).
        status (str): Lifecycle state (Pending -> Active -> Complete -> Archived).
        start_date/end_date (date): Optional scheduling constraints.
    """
    
    class ProjectStatus(models.TextChoices):
        """Lifecycle states for a project."""
        PENDING = "pending", "Pending"     # Created but not yet "launched"
        ACTIVE = "active", "Active"        # Ongoing work
        COMPLETE = "complete", "Complete"  # Finished
        ARCHIVED = "archived", "Archived"  # Hidden from main views

    title = models.CharField(verbose_name="project_title", max_length=200)
    description = models.TextField(verbose_name="project_description", blank=True, null=True)
    
    status = models.CharField(
        choices=ProjectStatus.choices, 
        default=ProjectStatus.PENDING, 
        max_length=15,
        help_text="Controls the visibility and editability of the project."
    )

    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(
        to=settings.AUTH_USER_MODEL, 
        related_name="owned_projects", 
        on_delete=models.CASCADE,
        help_text="The super-admin of the project."
    )

    # Architectural Decision: Explicit Intermediate Model
    # We use 'through=ProjectMembership' to store extra metadata (Role, Status)
    # about the relationship, rather than a simple ID-to-ID link.
    members = models.ManyToManyField(
        to=settings.AUTH_USER_MODEL, 
        through="ProjectMembership",
        related_name="joined_members", 
        blank=True
    )

    def __str__(self) -> str:
        return self.title


class ProjectMembership(models.Model):
    """
    Represents the link between a User and a Project.

    This acts as both a permission ledger (Viewer vs Editor) and an 
    invitation system (Pending vs Active).

    Design Pattern:
        This model handles the 'Invitation Workflow'. A record is created with 
        status='PENDING' when an invite is sent. It transitions to 'ACTIVE' 
        only when the user accepts.

    Attributes:
        invite_email (str): Used if inviting a user who hasn't registered yet.
        access_level (str): Permissions (Viewer/Editor/Admin).
        status (str): The state of the invitation.
    """

    class AccessLevel(models.TextChoices):
        VIEWER = "viewer", "Viewer"
        EDITOR = "editor", "Editor"
        ADMIN = "admin", "Admin"
    
    class Status(models.TextChoices):
        PENDING = "pending", "Pending (Invite Sent)"
        ACTIVE = "active", "Active (Accepted)"
        REJECTED = "rejected", "Rejected"
    
    # 'user' is nullable to support invites sent to emails that don't exist in our DB yet.
    # As a phase 2 thought, this could be extended to send an invite link to an email to the app itself and directly establish the user and the record on registration with a signal on post create to query existing invite records so they would appear automatically.
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL, 
        related_name="project_memberships", 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True
    )
    
    invite_email = models.EmailField(null=True, blank=True, help_text="For sending invites to non-registered users.")
    project = models.ForeignKey(to=Project, related_name="memberships", on_delete=models.CASCADE)
    
    access_level = models.CharField(choices=AccessLevel.choices, max_length=10, default=AccessLevel.VIEWER)
    status = models.CharField(choices=Status.choices, max_length=30, default=Status.PENDING)
    date_sent = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Prevent duplicate memberships for the same user in the same project
        unique_together = ("user", "project")


class PinnedProject(models.Model):
    """
    A User Preference model allowing users to 'pin' projects to their dashboard.

    Design Choice:
        I separated this into its own table (instead of a boolean on ProjectMembership)
        to keep the 'Preference' logic distinct from the 'Permission' logic.
        This also allows for easy ordering by 'pinned_at'.
    """
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name="pinned_projects", on_delete=models.CASCADE)
    project = models.ForeignKey(to=Project, related_name="pinned_by", on_delete=models.CASCADE)
    pinned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "project")
        ordering = ["-pinned_at"] # Most recently pinned. Could also opt for a pinned view in phase 2.


class ProjectComment(models.Model):
    """
    A general-purpose comment stream for the project dashboard.
    """
    project = models.ForeignKey(
        Project, 
        related_name='comments', 
        on_delete=models.CASCADE
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='project_comments', 
        on_delete=models.CASCADE
    )

    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at'] 

    def __str__(self):
        return f"Comment by {self.author} on {self.project}"
