from django.shortcuts import render
from django.http import HttpResponse
import random
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TypeRacerText
def test(request):
    return HttpResponse("Hello there!",status=200)

class RandomTypeRacerTextAPIView(APIView):
    def get(self, request):
        texts = TypeRacerText.objects.all()
        if not texts.exists():
            return Response({"detail": "No texts available."}, status=404)

        random_text = random.choice(texts)
        return Response(random_text.content)
