from django.shortcuts import render
from django.http import HttpResponse
import random
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TypeRacerText, Bot
from .serializers import BotSerializer
from rest_framework import status
def test(request):
    return HttpResponse("Hello there!",status=200)

class RandomTypeRacerTextAPIView(APIView):
    def get(self, request):
        texts = TypeRacerText.objects.all()
        if not texts.exists():
            return Response({"detail": "No texts available."}, status=404)

        random_text = random.choice(texts)
        return Response({"content": random_text.content})

class RandomBotAPIView(APIView):
    def get(self, request):
        bots = list(Bot.objects.all())

        if not bots:
            return Response({"detail": "No bots available."}, status=status.HTTP_404_NOT_FOUND)

        bot = random.choice(bots)
        serializer = BotSerializer(bot)
        return Response(serializer.data)