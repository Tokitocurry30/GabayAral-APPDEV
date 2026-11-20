from django.test import SimpleTestCase
from django.urls import reverse


class HealthAPITests(SimpleTestCase):

    def test_health_endpoint_returns_200(self):
        response = self.client.get(
            reverse("health_check")
        )

        self.assertEqual(response.status_code, 200)

    def test_health_endpoint_returns_json(self):
        response = self.client.get(
            reverse("health_check")
        )

        self.assertEqual(
            response.json(),
            {
                "status": "ok",
                "service": "GabayAral Backend",
            },
        )

    def test_health_endpoint_rejects_post(self):
        response = self.client.post(
            reverse("health_check")
        )

        self.assertEqual(response.status_code, 405)