from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    first_name = models.CharField(verbose_name="First Name", max_length=30)
    last_name = models.CharField(verbose_name="Last Name", max_length=40)
    date_of_birth = models.DateField(verbose_name="Date of Birth")
    user = models.OneToOneField(to=User, verbose_name="User", related_name="profile", on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    role = models.CharField(max_length=50, default="Member")

    @property
    def full_name(self) -> str:
        return f'{self.first_name} {self.last_name}'
    
    def __str__(self) -> str:
        return f"{self.user.username}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance: User, created, **kwargs):
    if created:
        if not instance.username:
            instance.username = instance.email
            instance.save()
        UserProfile.objects.create(user=instance)