from django.db import models
from django.conf import settings

class Project(models.Model):
    class ProjectStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        ACTIVE = "active", "Active"
        COMPLETE = "complete", "Complete"
        ARCHIVED = "archived", "Archived"
    
    title = models.CharField(verbose_name="project_title", max_length=200)
    description = models.TextField(verbose_name="project_description", blank=True, null=True)
    status = models.CharField(
        choices=ProjectStatus.choices, 
        default=ProjectStatus.PENDING, 
        max_length=15
    )

    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(
        to=settings.AUTH_USER_MODEL, 
        related_name="owned_projects", 
        on_delete=models.CASCADE
    )

    members = models.ManyToManyField(
        to=settings.AUTH_USER_MODEL, 
        through="ProjectMembership",
        related_name="joined_members", 
        blank=True
    )

    def __str__(self) -> str:
        return self.title


class ProjectMembership(models.Model):
    class AccessLevel(models.TextChoices):
        VIEWER = "viewer", "Viewer"
        EDITOR = "editor", "Editor"
        ADMIN = "admin", "Admin"
    
    class Status(models.TextChoices):
        PENDING = "pending", "Pending (Invite Sent)"
        ACTIVE = "active", "Active (Accepted)"
        REJECTED = "rejected", "Rejected"
    
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name="project_memberships", on_delete=models.CASCADE)
    project = models.ForeignKey(to=Project, related_name="memberships", on_delete=models.CASCADE)
    access_level = models.CharField(choices=AccessLevel.choices, max_length=10, default=AccessLevel.VIEWER)
    status = models.CharField(choices=Status.choices, max_length=30, default=Status.PENDING)
    date_sent = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "project")

class PinnedProject(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name="pinned_projects", on_delete=models.CASCADE)
    project = models.ForeignKey(to=Project, related_name="pinned_by", on_delete=models.CASCADE)
    pinned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "project")
        ordering = ["-pinned_at"]
