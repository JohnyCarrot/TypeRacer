from rest_framework import serializers
from models import TypeRacerText


class TypeRacerTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeRacerText
        fields = ['id', 'content']
