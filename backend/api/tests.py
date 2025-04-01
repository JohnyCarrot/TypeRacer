from django.test import TestCase


class ViewTestCase(TestCase):
    def test_test_view_returns_ok(self):
        print("Spúšťam testovací test")
        response = self.client.get('/test/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Hello there!")
