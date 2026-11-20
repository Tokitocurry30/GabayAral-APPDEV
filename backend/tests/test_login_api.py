import json
from unittest.mock import patch

from django.test import RequestFactory, SimpleTestCase
from django.urls import reverse

from accounts.views import login_user


class LoginAPITests(SimpleTestCase):

    def setUp(self):
        self.factory = RequestFactory()

    def make_request(self, data):
        return self.factory.post(
            "/api/auth/login/",
            data=json.dumps(data),
            content_type="application/json",
        )

    def test_login_route_exists(self):
        self.assertEqual(
            reverse("accounts:login"),
            "/api/auth/login/",
        )

    def test_invalid_json_is_rejected(self):
        request = self.factory.post(
            "/api/auth/login/",
            data="{invalid json",
            content_type="application/json",
        )

        response = login_user(request)

        self.assertEqual(response.status_code, 400)

    def test_missing_credentials_are_rejected(self):
        response = login_user(
            self.make_request({"username": ""})
        )

        self.assertEqual(response.status_code, 400)

    @patch("accounts.views.authenticate")
    def test_invalid_credentials_are_rejected(self, mock_auth):
        mock_auth.return_value = None

        response = login_user(
            self.make_request({
                "username": "student1",
                "password": "wrongpassword",
            })
        )

        self.assertEqual(response.status_code, 401)

    @patch("accounts.views.login")
    @patch("accounts.views.authenticate")
    def test_successful_login(self, mock_auth, mock_login):
        from unittest.mock import Mock

        mock_user = Mock()
        mock_user.pk = 1
        mock_user.get_username.return_value = "student1"
        mock_auth.return_value = mock_user

        response = login_user(
            self.make_request({
                "username": "student1",
                "password": "correctpassword",
            })
        )

        self.assertEqual(response.status_code, 200)
        mock_login.assert_called_once()

        data = json.loads(response.content)
        self.assertEqual(data["user"]["username"], "student1")

    def test_get_method_is_rejected(self):
        response = self.client.get(
            reverse("accounts:login")
        )

        self.assertEqual(response.status_code, 405)