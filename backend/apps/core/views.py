from django.http import JsonResponse
from django.core.management import call_command
from django.conf import settings
from django.views.decorators.http import require_http_methods
from rest_framework.status import (HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_401_UNAUTHORIZED)

@require_http_methods(["GET"])
def trigger_daily_cron(request, token):
    """
    Triggers a Django core command to check for tasks that are overdue in the database and trigger notifications.
    Set to trigger at 9 a.m daily. Killing endpoint after assignment as been concluded.

    :param token: Token obtained from CRON service. Must match environment secret key.

    URL: GET /api/cron/trigger/<str:token>/

    Returns a JSON Response with a message and a status of success or failure. 
    Shape: ({ status: string, message: string }, status=RestFramework Status Enum)
    """

    # Check if token from URL matches SECRET KEY
    # Return an error response if it doesnt
    if token != settings.CRON_SECRET_KEY:
        return JsonResponse({ 'status': "error", "message": "Unauthorised" }, status=HTTP_401_UNAUTHORIZED)
    
    try:
        # Attempt to call the command
        call_command("check_overdue")
        
        # Return a success payload
        return JsonResponse({ 'status': 'success', 'message': "Overdue check complete" }, status=HTTP_200_OK)
    except Exception as e:
        # Return a 500 server error payload
        return JsonResponse({ 'status': "error", "message": str(e) }, status=HTTP_500_INTERNAL_SERVER_ERROR)