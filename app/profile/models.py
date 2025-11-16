from django.db import models
from django.contrib.auth.models import User

# Create your models here.

def get_default_theme() -> int | None:
    """Return the default theme primary key if one exists or None"""

    # All theme rows
    themes = Theme.objects

    # Find the theme with the name default
    default = themes.filter(name="Default").first()

    # Return the primary key of the default if on exists
    if default:
        return default.pk
    
    # If none exist default to the first
    first_theme = themes.first()
    if first_theme:
        return first_theme.pk
    
    # Handle an error here on the caller
    return None

class ThemeMode(models.TextChoices):
    """Defines options for light, dark and system modes"""
    DARK = "DARK", "Dark"
    LIGHT = "LIGHT", "Light"
    SYSTEM = "SYSTEM", "System"

class Theme(models.Model):
    """Holds data to derive HSL colors from in the UI"""

    name = models.CharField(
        verbose_name="Theme Name",
        max_length=50,
        default="Default"
    )

    primary_color = models.IntegerField(
        verbose_name="Primary Color",
        default=100,
    )

    secondary_color = models.IntegerField(
        verbose_name="Secondary Color",
        default=100,
    )

    tertiary_color = models.IntegerField(
        verbose_name="Tertiary Color",
        default=100,
    )

    text_color = models.IntegerField(
        verbose_name="Text Color",
        default=100,
    )

class Preference(models.Model):
    """Holds a collection of preferences tied to a user"""

    # Connection to the user
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="preferences"
    )

    # Points to Amazon S3 bucket storing profile picture
    profile_picture = models.ImageField(
        verbose_name="Profile Picture",
        null=True,
        upload_to="profile_pics/",
        blank=True
    )

    # Derived from the Theme Mode enum. Defines light / dark scheme
    theme_mode = models.CharField(
        verbose_name="Theme Mode",
        max_length=10,
        choices=ThemeMode.choices,
        default=ThemeMode.SYSTEM
    )
    
    # Connection to the theme table to get the colors from
    theme = models.ForeignKey(
        Theme,
        on_delete=models.SET_DEFAULT,
        default=get_default_theme,
        null=True
    )

class Note(models.Model):
    """Note model for personal note taking"""

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notes"
    )

    title = models.CharField(
        verbose_name="Title",
        max_length=100
    )

    content = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )
