from django.shortcuts import render
from dj_rest_auth.views import UserDetailsView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from django.conf import settings

class UserProfileDetailView(generics.RetrieveUpdateAPIView):
    """
    Endpoint for retrieving and updating the *current* user's profile.

    Design Pattern - "Me" Endpoint:
    Standard REST principles often use /users/<id>/, but frontend apps need 
    a way to "get my own details" without knowing the ID first. 
    This view overrides `get_object` to return the profile of the 
    requesting user implicitly.

    Supported Methods:
    - GET: Returns profile data (Avatar, Name, Settings).
    - PATCH: Updates specific fields (e.g., uploading a new avatar).
    """
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Overridden to return the profile of the currently logged-in user,
        bypassing the need for a 'pk' in the URL.
        """
        return self.request.user.profile

class CustomUserDetailsView(UserDetailsView):
    """
    Custom extension of dj-rest-auth's User view.

    Purpose:
    We override this primarily to implement a secure 'Delete Account' flow.
    """
    # Parsers added to support potential file uploads if user details involved avatars here
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    def delete(self, request, *args, **kwargs):
        """
        Secure Account Deletion.

        Security Measures:
        1. **Re-Authentication:** Requires the user to enter their password to confirm.
           (Prevents accidental deletion if a session is left open).
        2. **Challenge Phrase:** Requires typing a specific sentence to prevent 
           automated clicks or "fat finger" mistakes.
        3. **Token Cleanup:** Manually deletes all auth cookies to ensure the 
           client is fully logged out immediately.
        """
        user = self.get_object()

        password = request.data.get("password")
        challenge_phrase = request.data.get("challenge")

        # Security Check 1: Verify Password
        if not password or not user.check_password(password):
            return Response(
                { "password": ["Incorrect password"]}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Security Check 2: Challenge Phrase
        expected_phrase = "I confirm I want to delete my account."
        if challenge_phrase != expected_phrase:
            return Response(
                { "challenge": ["Incorrect confirmation phrase"]}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Action: Irreversible Deletion
        user.delete()

        # Cleanup: Prepare success response
        response = Response(status=status.HTTP_200_OK)

        # Robustness: Clear all possible auth cookies
        # This handles HTTPOnly cookies that JS cannot delete
        cookie_name = getattr(settings, "JWT_AUTH_COOKIE", "auth-token")
        refresh_cookie_name = getattr(settings, "JWT_REFRESH_COOKIE", "refresh-token")
        
        cookie_names = [cookie_name, refresh_cookie_name, "sessionid", "csrftoken"]

        for cookie in cookie_names:
            response.delete_cookie(cookie)

        return response

