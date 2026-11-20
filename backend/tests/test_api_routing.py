"""
GabayAral API Routing Tests

Tests the authentication URL configuration
without requiring database migrations.
"""

from django.test import SimpleTestCase
from django.urls import get_resolver


class AuthenticationRoutingTests(SimpleTestCase):

    def test_accounts_namespace_registered(self):
        resolver = get_resolver()

        self.assertIn(
            "accounts",
            resolver.namespace_dict,
        )

    def test_authentication_prefix_registered(self):
        resolver = get_resolver()

        matches = [
            pattern
            for pattern in resolver.url_patterns
            if str(pattern.pattern) == "api/auth/"
        ]

        self.assertEqual(len(matches), 1)