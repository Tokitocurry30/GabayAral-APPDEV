"""
GabayAral Authentication Configuration Tests

Verifies the Django authentication foundation
without requiring database migrations.
"""

from django.conf import settings
from django.test import SimpleTestCase


class AuthenticationConfigurationTests(SimpleTestCase):

    def test_custom_user_model(self):
        self.assertEqual(
            settings.AUTH_USER_MODEL,
            "accounts.User"
        )

    def test_authentication_app_installed(self):
        self.assertIn(
            "django.contrib.auth",
            settings.INSTALLED_APPS
        )

    def test_accounts_app_installed(self):
        self.assertIn(
            "accounts",
            settings.INSTALLED_APPS
        )

    def test_session_middleware_enabled(self):
        self.assertIn(
            "django.contrib.sessions.middleware.SessionMiddleware",
            settings.MIDDLEWARE
        )

    def test_authentication_middleware_enabled(self):
        self.assertIn(
            "django.contrib.auth.middleware.AuthenticationMiddleware",
            settings.MIDDLEWARE
        )

    def test_csrf_middleware_enabled(self):
        self.assertIn(
            "django.middleware.csrf.CsrfViewMiddleware",
            settings.MIDDLEWARE
        )

    def test_postgresql_backend_configured(self):
        self.assertEqual(
            settings.DATABASES["default"]["ENGINE"],
            "django.db.backends.postgresql"
        )