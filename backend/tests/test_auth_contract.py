from django.test import SimpleTestCase
from django.urls import reverse, NoReverseMatch


class AuthenticationRouteTests(SimpleTestCase):

    def test_login_route_exists(self):
        """Login endpoint should be registered."""

        try:
            url = reverse("accounts:login")
        except NoReverseMatch:
            self.fail("Login API route has not been implemented.")

        self.assertEqual(url, "/api/auth/login/")

    def test_register_route_exists(self):
        """Registration endpoint should be registered."""

        try:
            url = reverse("accounts:register")
        except NoReverseMatch:
            self.fail("Registration API route has not been implemented.")

        self.assertEqual(url, "/api/auth/register/")

    def test_logout_route_exists(self):
        """Logout endpoint should be registered."""

        try:
            url = reverse("accounts:logout")
        except NoReverseMatch:
            self.fail("Logout API route has not been implemented.")

        self.assertEqual(url, "/api/auth/logout/")

    def test_current_user_route_exists(self):
        """Current user endpoint should be registered."""

        try:
            url = reverse("accounts:me")
        except NoReverseMatch:
            self.fail("Current user API route has not been implemented.")

        self.assertEqual(url, "/api/auth/me/")

    def test_school_selection_route_exists(self):
        """School selection endpoint should be registered."""

        try:
            url = reverse("accounts:select_school")
        except NoReverseMatch:
            self.fail("School selection API route has not been implemented.")

        self.assertEqual(url, "/api/auth/select-school/")

