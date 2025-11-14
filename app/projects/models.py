from django.db import models
from django.db.models import Count
from django.db.models.manager import Manager
from django.contrib.auth.models import User
from django.utils import timezone
from organisations.models import Team
from datetime import datetime, timedelta

# Create your models here.

def get_default_start_date() -> datetime:
    """Returns a datetime object of today"""
    return timezone.now()

def get_default_end_date() -> datetime:
    """Returns a datetime object of 30 days from today"""
    delta = timedelta(days=30)
    return timezone.now() + delta
class Status(models.TextChoices):
    """
    Enum to define the status of the project
    """

    NOT_STARTED = "NOT_STARTED", "Not Started"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    NEEDS_APPROVAL = "NEEDS_APPROVAL", "Needs Approval"
    STALLED = "STALLED", "Stalled"
    ABANDONED = "ABANDONED", "Abandoned"
    DEFINING_SCOPE = "DEFINING_SCOPE", "Defining Scope"
    UPCOMING = "UPCOMING", "Upcoming"
    COMPLETED = "COMPLETED", "Completed"

class TaskStatus(models.TextChoices):
    """Status types more specific to tasks"""
    TO_DO = "TO_DO", "To Do"
    IN_PROGRESS = "IN_PROGRESS", "In Progress"
    IN_REVIEW = "IN_REVIEW", "In Review"
    DONE = "DONE", "Done"

class CommentStatus(models.TextChoices):
    """Comment status to define visiblity"""
    HIDDEN = "HIDDEN", "Hidden"
    IN_PROGRESS = "VISIBLE", "VISIBLE"
    TEAM_ONLY = "TEAM_ONLY", "Team Only"

class Difficulty(models.TextChoices):
    """
    Enum options for difficulty
    """

    VERY_EASY = "VERY_EASY", "Very Easy"
    EASY = "EASY", "Easy"
    MEDIUM = "MEDIUM", "Medium"
    HARD = "HARD", "Hard"
    VERY_HARD = "VERY_HARD", "Very Hard"

class Priority(models.TextChoices):
    """
    Enum to define the status of the project
    """

    LOW = "LOW", "Low"
    MEDIUM = "MEDIUM", "Medium"
    HIGH = "HIGH", "High"
    CRITICAL = "CRITICAL", "Critical"

class Project(models.Model):
    """
    Project model
    Base class for a Project.
    Contains components or tasks and is owned by a team and a user
    """

    # Project name
    name = models.CharField(
        verbose_name="Name",
        max_length=50,
    )

    # Team who owns the project
    team = models.ForeignKey(
        to=Team,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    # Status derived from the Status enum (Will include automated checks)
    status = models.CharField(
        verbose_name="Status",
        choices=Status.choices,
        default=Status.DEFINING_SCOPE,
        max_length=20
    )

    # Difficulty derived from the Difficulty enum
    difficulty = models.CharField(
        verbose_name="Difficulty",
        choices=Difficulty.choices,
        default=Difficulty.MEDIUM,
        max_length=15
    )
    
    # Priority derived from the Priority Enum
    priority = models.CharField(
        verbose_name="Priority",
        choices=Priority.choices,
        default=Priority.MEDIUM,
        max_length=15
    )

    # Date which the project starts. Defaults to today
    start_date = models.DateField(
        verbose_name="Start Date",
        default=get_default_start_date
    )

    # Date which the project end. Defaults to 30 days from today
    end_date = models.DateField(
        verbose_name="End Date",
        default=get_default_end_date
    )

    # Helper property to evaluate if status is overdue
    @property
    def is_overdue(self):
        return self.end_date < timezone.now().date() and self.status != Status.COMPLETED

class Component(models.Model):
    """Works as an intermediary grouping for related tasks on larger projects"""

    # Related Project
    project = models.ForeignKey(
        to=Project,
        on_delete=models.CASCADE,
        related_name="project_components"
    )

    # Component name
    name = models.CharField(
        verbose_name="Name",
        max_length=50,
    )

    # User who owns the component
    assigned = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        related_name="assigned_components",
        null=True
    )

    # Satisfy the compiler
    tasks: Manager

    @property
    def status(self):
        """Calculates the component status. Component takes the state of the least complete Task"""

        # Default case
        if not self.tasks.exists():
            return Status.DEFINING_SCOPE
        
        # Any tasks not completed return In Progress
        if self.tasks.filter(
            status__in=[TaskStatus.TO_DO, TaskStatus.IN_PROGRESS]
        ).exists():
            return Status.IN_PROGRESS

        # Anything in review mark it as Needs Approval
        if self.tasks.filter(status=TaskStatus.IN_REVIEW).exists():
            return Status.NEEDS_APPROVAL
        
        # Must be Complete, return Completed
        return Status.COMPLETED


    @property
    def difficulty(self):
        """Aggregates the difficulty status of the tasks under the component and takes the difficulty of the most frequent"""

        # Get all of the values in the tasks in the component
        # Found the column difficulty
        # Map the occurences of the different values and aggregate them into a frequency count
        # Order the descending (Highest to Lowest)
        # Take the first value
        most_frequent = self.tasks.values('difficulty')\
            .annotate(count=Count('difficulty'))\
                .order_by('-count')\
                    .first()

        # If there is not highest frequency return the default
        if not most_frequent:
            return Difficulty.MEDIUM

        return most_frequent["difficulty"]


    @property
    def priority(self):
        """Calculates the component priority. Component takes the state of the highest priority Task"""

        unfinshed_tasks = self.tasks.all().exclude(status=TaskStatus.DONE)

        # Default case
        if not unfinshed_tasks.exists():
            return Priority.MEDIUM
        
        # Critical priority task exists, mark as Critical to complete
        if unfinshed_tasks.filter(priority=Priority.CRITICAL).exists():
            return Priority.CRITICAL
        
        # High priority
        if unfinshed_tasks.filter(priority=Priority.HIGH).exists():
            return Priority.HIGH

        # Medium priority
        if unfinshed_tasks.filter(priority=Priority.MEDIUM).exists():
            return Priority.MEDIUM
        
        # Low priority
        return Priority.LOW


class Task(models.Model):
    """Tasks realted to components or directly to projects"""

    # Related Project
    component = models.ForeignKey(
        to=Component,
        on_delete=models.CASCADE,
        related_name="tasks",
        null=True
    )

    # Component name
    name = models.CharField(
        verbose_name="Name",
        max_length=50,
    )

    # User who owns the task
    assigned = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        related_name="tasks",
        null=True,
        blank=True
    )

    # Status derived from the Status enum (Will include automated checks)
    status = models.CharField(
        verbose_name="Status",
        choices=TaskStatus.choices,
        default=TaskStatus.TO_DO,
        max_length=20
    )

    # Difficulty derived from the Difficulty enum
    difficulty = models.CharField(
        verbose_name="Difficulty",
        choices=Difficulty.choices,
        default=Difficulty.MEDIUM,
        max_length=15
    )
    
    # Priority derived from the Priority Enum
    priority = models.CharField(
        verbose_name="Priority",
        choices=Priority.choices,
        default=Priority.MEDIUM,
        max_length=15
    )

    # Date which the project starts. Defaults to today
    start_date = models.DateField(
        verbose_name="Start Date",
        default=get_default_start_date
    )

    # Date which the task end. Defaults to 30 days from today
    due_date = models.DateField(
        verbose_name="End Date",
        default=get_default_end_date
    )

    # File attachements. Points to Amazon S3 Bucket
    attachment = models.FileField(
        upload_to="task_attachments/",
        null=True,
        blank=True
    )

class Comment(models.Model):
    """Tracks Project comments and users"""

    # Related project
    project = models.ForeignKey(
        to=Project,
        on_delete=models.CASCADE,
        related_name="comments"
    )

    # Who wrote it
    author = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE
    )

    # Message content
    message = models.TextField()

    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)

    # Visibility controls derived from Comment Status
    visiblity = models.CharField(
        verbose_name="Visibility",
        choices=CommentStatus.choices,
        default=CommentStatus.TEAM_ONLY,
        max_length=20
    )