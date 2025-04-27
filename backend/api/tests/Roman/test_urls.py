from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

class URLTests(APITestCase):
    def test_test_endpoint(self):
        url = '/test/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_random_text_endpoint(self):
        url = reverse('type-racer-text-random')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_random_bot_endpoint(self):
        url = reverse('random-bot')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
