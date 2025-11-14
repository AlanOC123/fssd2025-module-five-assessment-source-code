from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Organisation(models.Model):
    """
    Organisation model
    Base class for an organisation. Can be either individual or team.
    Type controls view downstream and in the frontend.
    """

    # Enum options for organisation type
    class OrgTypes(models.TextChoices):
        """
        OrgTypes enum. Used to specify the type of organisation the account is. Individual is a private contributor. Team is a collection of individuals.
        """
        PERSONAL = "PERSONAL", "personal"
        TEAM = "TEAM", "team"

    # Base Model Data

    # Name of the organisation
    name = models.CharField("Organisation Name", max_length=100)

    # Type of the organisation. Inherits choices from OrgTypes
    org_type = models.CharField(
        max_length=10, 
        choices=OrgTypes.choices,
        default=OrgTypes.PERSONAL
    )

    # Organisation logo. Will point to an S3 bucket
    logo = models.ImageField(
        "Organisation Logo", 
        null=True,
        blank=True,
        upload_to="org_logos/"
    )

    # Super user of the associated organisation
    super_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="owned_organisations"
    )

    def __str__(self) -> str:
        return self.name

class Team(models.Model):
    """
    Team model
    Base class for a team. Enables collaboratio features with co existing members. Members can belong to multiple teams.
    """

    # Enum options for organisation type
    class TeamDepartment(models.TextChoices):
        """
        TeamDepartment enum. Used to specify the function of the team. Specifies alignment in organisation (Potentially available roles also)
        """
        STANDARD = "STANDARD", "standard"
        SALES = "SALES", "sales",
        SERVICE = "SERVICE", "service",
        MARKETING = "MARKETING", "marketing",
    
    class TeamEnrollmentType(models.TextChoices):
        """
        List of choices for team enrollment
        """
        ADMIN_INVITE_ONLY = "ADMIN", "admin"
        MEMBER = "MEMBER", "member"
        REQUEST = "REQUEST", "request"
        OPEN = "OPEN", "open"

    # Declared minimum team size
    min_members_count = models.IntegerField(verbose_name="Minumum Team Size", default=1)

    # Declared minimum team size
    max_members_count = models.IntegerField(verbose_name="Maximum Team Size", default=10)

    # Name of this team
    team_name = models.CharField(verbose_name="Team Name", max_length=100)

    # Organisation the team is associated with
    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="teams"
    )

    # Team members aligned to this team
    members = models.ManyToManyField(
        User,
        through="Membership",
        related_name="teams"
    )

    # Team description or vision
    description = models.TextField(verbose_name="Description", null=True, blank=True)

    # Team department derived from the enum 
    department = models.CharField(
        verbose_name="Department",
        default=TeamDepartment.STANDARD,
        choices=TeamDepartment.choices,
        max_length=20,
    )

    # Defines whether or not members from external teams
    is_private = models.BooleanField(
        verbose_name="Private",
        default=False
    )

    # Defines method of enrollment
    enrollment_type = models.CharField(
        verbose_name="Enrollment Type",
        default=TeamEnrollmentType.REQUEST,
        choices=TeamEnrollmentType.choices,
        max_length=15
    )

    # Projects: One to Many Field


class Membership(models.Model):
    """Defines the connection between the team model and the parent organisation"""

    class MemberRoles(models.TextChoices):
        MEMBER = "MEMBER", "Member"
        LEADER = "LEADER", "Leader"

    # Connection to the user table. Allows user.membership.team
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name="membership"
    )

    # Connection to the team table. Allows team.membership.user
    team = models.ForeignKey(
        to=Team,
        on_delete=models.CASCADE,
        related_name="membership"
    )

    # Defines the permissions the end user has related to this team
    role = models.CharField(
        verbose_name="Role",
        max_length=10,
        default=MemberRoles.MEMBER,
        choices=MemberRoles.choices
    )
    
    class Meta:
        """Database level constraint. Ensures a user cannot join a team more than once."""
        unique_together = ("user", "team")
    
    def __str__(self) -> str:
        return f"{self.user.username} - {self.team.team_name} - ({self.get_role_display()})"