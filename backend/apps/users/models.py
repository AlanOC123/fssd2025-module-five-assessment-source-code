from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    """
    Extends the standard Django User model with additional public information.

    Design Pattern - Proxy/Extension:
    Django's default 'User' model is great for Auth (username, password, permissions),
    but poor for application-specific data. We use a OneToOne link to 'UserProfile'
    to store things like Avatars and Bios without modifying the core Auth table.

    Attributes:
        user (User): The link to the auth system.
        avatar (Image): Image file field for profile pictures.
        full_name (property): Helper to format names consistently across the app.
    """
    
    user = models.OneToOneField(
        to=User, 
        verbose_name="User", 
        related_name="profile", 
        on_delete=models.CASCADE
    )
    
    first_name = models.CharField(verbose_name="First Name", max_length=30, null=True, blank=True)
    last_name = models.CharField(verbose_name="Last Name", max_length=40, null=True, blank=True)
    date_of_birth = models.DateField(verbose_name="Date of Birth", null=True, blank=True)
    
    # Stores the image path. Phase 2 would be AWS S3 bucket storage. 
    # this will store the S3 key.
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)

    @property
    def full_name(self) -> str:
        """Returns a formatted string of the user's name."""
        return f'{self.first_name} {self.last_name}'
    
    def __str__(self) -> str:
        return f"{self.user.username}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance: User, created, **kwargs):
    """
    Signal receiver that executes immediately after a User is saved.

    Purpose:
    Ensures that every User account *always* has a corresponding UserProfile.
    This prevents 'RelatedObjectDoesNotExist' errors in the views when 
    accessing `request.user.profile`.

    Logic:
    1. If a new User is created via Admin or Register API...
    2. Check if they need a username fallback (using email).
    3. Create the empty UserProfile automatically.
    """
    if created:
        # Fallback: If no username provided (e.g. email-based signup), use email
        if not instance.username:
            instance.username = instance.email
            instance.save()
            
        # The Critical Step: Create the profile link
        UserProfile.objects.get_or_create(user=instance)