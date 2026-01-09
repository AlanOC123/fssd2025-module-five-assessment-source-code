from django.shortcuts import render
from dj_rest_auth.views import UserDetailsView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from .serializers import UserProfileSerializer


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

        return Response(status=status.HTTP_204_NO_CONTENT)