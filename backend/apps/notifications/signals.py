from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from apps.projects.models import ProjectMembership, Project
from .models import Notification

"""
Signal receivers for the Notifications app.

These functions act as event listeners. They decouple the notification logic 
from the views, ensuring that alerts are generated regardless of where 
the change originated (API, Admin Panel, or Shell).
"""

# 1. Invited to a project
@receiver(post_save, sender=ProjectMembership)
def notify_on_invite(sender, instance, created, **kwargs):
    """
    Triggers when a new ProjectMembership is created with PENDING status.
    
    Args:
        sender: The model class (ProjectMembership).
        instance: The actual instance being saved.
        created (bool): True if a new record was created.
    """
    # Guard Clause: Only trigger on NEW records that are specifically PENDING.
    # This prevents notifications if an admin manually creates an ACTIVE member.
    if created and instance.status == ProjectMembership.Status.PENDING:
        
        # Robustness Check: Ensure the membership is linked to a real User.
        # (Handles cases where we might invite by email but the user hasn't registered yet. Prevents Ghost User notifications).
        if instance.user: 
            Notification.objects.create(
                recipient=instance.user,
                actor=instance.project.owner, # The project owner is the "Actor"
                project=instance.project,
                notification_type=Notification.Type.PROJECT_INVITE,
                message=f"Invited you to join '{instance.project.title}'"
            )

# 2. Invitation Accepted (Status Change)
@receiver(post_save, sender=ProjectMembership)
def notify_on_status_change(sender, instance, created, **kwargs):
    """
    Triggers when an existing membership changes status to ACTIVE.
    Notifies the Project Owner that someone accepted their invite.
    """
    # Guard Clause: We only care about UPDATES, not new creations.
    if not created: 
        if instance.status == ProjectMembership.Status.ACTIVE:
            
            # Note: We rely on the frontend/view logic to ensure only the 
            # invited user can trigger this state change.
            Notification.objects.create(
                recipient=instance.project.owner,
                actor=instance.user,
                project=instance.project,
                notification_type=Notification.Type.INVITE_ACCEPTED,
                message=f"Accepted your invitation to '{instance.project.title}'"
            )

# 3. Project Completed (Broadcast)
@receiver(post_save, sender=Project)
def notify_project_complete(sender, instance, created, **kwargs):
    """
    Broadcasts a notification to ALL active members when a project is marked complete.
    """
    # Check if this is an update and the status is specifically 'complete'
    if not created and instance.status == 'complete': 
        
        # Performance Note: 
        # For a massive scale app, iterating in a signal is not ideal. Better to use an async task queue with a tool like Celery.
        # Stuck with loop iteration for this project given scale of app.

        members = instance.memberships.filter(status='active')
        
        for member in members:
            # Loop through every member and create a personalised alert
            if member.user:
                Notification.objects.create(
                    recipient=member.user,
                    actor=instance.owner, 
                    project=instance,
                    notification_type=Notification.Type.PROJECT_COMPLETED,
                    message=f"Project '{instance.title}' has been marked as complete"
                )