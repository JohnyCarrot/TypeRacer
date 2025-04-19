from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import TypeRacerText

class RandomTextAPITest(TestCase):
    def setUp(self):
        TypeRacerText.objects.all().delete()
        self.client = APIClient()
        self.texts = [
            "First sample text for testing.",
            "Another example of a typing text.",
            "Typing is fun when the text flows well.",
        ]
        for text in self.texts:
            TypeRacerText.objects.create(content=text)

    def test_random_text_api_returns_valid_text(self):
        url = reverse('type-racer-text-random')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("content", response.data)
        self.assertIsInstance(response.data["content"], str)
        self.assertIn(response.data["content"], self.texts)

    def test_random_text_api_returns_404_when_empty(self):
        TypeRacerText.objects.all().delete()

        url = reverse('type-racer-text-random')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'detail': 'No texts available.'})
