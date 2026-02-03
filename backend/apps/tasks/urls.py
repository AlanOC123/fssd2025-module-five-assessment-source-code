"""
URL Configuration for the Tasks App.

This module leverages DRF's DefaultRouter to automatically generate the 
RESTful routing for Task resources.

Exposed Endpoints:
    - GET /api/tasks/             -> List all tasks (filterable by project).
    - POST /api/tasks/            -> Create a new task.
    - GET /api/tasks/<id>/        -> Retrieve a specific task.
    - PATCH /api/tasks/<id>/      -> Partially update a task.
    - POST /api/tasks/<id>/toggle/ -> Custom action to mark task as complete/incomplete.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewset

# Initialize the router
router = DefaultRouter()

# Register the TaskViewset.
# We use the root path '' because this app is already included under 
# '/api/tasks/' in the main project urls.py.
router.register(r'', viewset=TaskViewset, basename="task")

urlpatterns = [
    # The 'include(router.urls)' handles all standard actions (list, create, etc.)
    # and any @action decorators defined within the ViewSet.
    path('', include(router.urls))
]