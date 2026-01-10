from django.shortcuts import render
from dj_rest_auth.views import UserDetailsView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from django.conf import settings


class UserProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class CustomUserDetailsView(UserDetailsView):
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    def delete(self, request, *args, **kwargs):
        user = self.get_object()

        password = request.data.get("password")
        challenge_phrase = request.data.get("challenge")

        if not password or not user.check_password(password):
            return Response({ "password": ["Incorrect password"]}, status=status.HTTP_400_BAD_REQUEST)
        
        if not challenge_phrase == "I confirm I want to delete my account.":
            return Response({ "challenge": ["Incorrect confirmation"]}, status=status.HTTP_400_BAD_REQUEST)
        
        user.delete()

        response = Response(status=status.HTTP_200_OK)

        cookie_name = getattr(settings, "JWT_AUTH_COOKIE", "auth-token")
        refresh_cookie_name = getattr(settings, "JWT_REFRESH_COOKIE", "refresh-token")

        cookie_names = [cookie_name, refresh_cookie_name, "sessionid", "csrftoken"]

        for cookie in cookie_names:
            response.delete_cookie(cookie)

        return response


