from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PreferenceSerializer, ThemeSerializer, NoteSerializer
from .models import Preference, Theme, Note

# Create your views here.
class PreferenceViewSet(viewsets.ModelViewSet):
    queryset = Preference.objects.all()
    serializer_class = PreferenceSerializer

class ThemeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
