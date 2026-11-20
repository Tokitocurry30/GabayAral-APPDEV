from unittest.mock import Mock

from django.test import RequestFactory, SimpleTestCase
from django.urls import reverse

from accounts.views import invite_school_user


class SchoolUserInvitationAPITests(SimpleTestCase):

    def test_anonymous_user_is_denied(self):
        response = self.client.post(
            reverse("accounts:invite_school_user"),
            data='{"email":"teacher@example.com","role":"teacher"}',
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 401)

    def test_authenticated_user_without_role_is_denied(self):
        request = RequestFactory().post(
            "/api/auth/school-admin/users/invite/",
            data='{"email":"teacher@example.com","role":"teacher"}',
            content_type="application/json",
        )

        request.user = Mock(is_authenticated=True)

        response = invite_school_user(request)

        self.assertEqual(response.status_code, 403)

    def test_get_method_is_rejected(self):
        response = self.client.get(
            reverse("accounts:invite_school_user")
        )

        self.assertEqual(response.status_code, 405)

    def test_frontend_role_does_not_grant_access(self):
        request = RequestFactory().post(
            "/api/auth/school-admin/users/invite/",
            data='{"email":"teacher@example.com","role":"teacher"}',
            content_type="application/json",
        )

        request.user = Mock(is_authenticated=True)
        request.user.role = "school_admin"

        response = invite_school_user(request)

        self.assertEqual(response.status_code, 403)