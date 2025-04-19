from rest_framework import serializers
from .models import TypeRacerText, Bot


class TypeRacerTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeRacerText
        fields = ['id', 'content']
class BotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bot
        fields = ['id', 'name', 'base_wpm']