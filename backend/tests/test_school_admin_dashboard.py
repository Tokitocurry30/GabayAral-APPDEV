from django.test import SimpleTestCase
from django.urls import reverse
from unittest.mock import Mock, patch


class SchoolAdminDashboardTests(SimpleTestCase):

    def test_anonymous_user_is_denied(self):
        response = self.client.get(
            reverse("accounts:school_admin_dashboard")
        )

        self.assertEqual(response.status_code, 401)

    def test_authenticated_user_is_denied_without_permissions(self):
        user = Mock()
        user.is_authenticated = True

        with patch(
            "django.contrib.auth.middleware.AuthenticationMiddleware.process_request"
        ):
            pass

        from django.test import RequestFactory
        from accounts.views import school_admin_dashboard

        request = RequestFactory().get(
            "/api/auth/school-admin/dashboard/"
        )
        request.user = user

        response = school_admin_dashboard(request)

        self.assertEqual(response.status_code, 403)

    def test_post_method_is_rejected(self):
        response = self.client.post(
            reverse("accounts:school_admin_dashboard")
        )

        self.assertEqual(response.status_code, 405)