"""
Tests for the temporary school authorization blueprint.

These tests do not require database migrations.
"""

from unittest.mock import Mock

from django.core.exceptions import PermissionDenied
from django.test import SimpleTestCase

from accounts.security.permissions import (
    require_school_permission,
)


class SchoolPermissionBlueprintTests(SimpleTestCase):

    def test_unauthenticated_user_is_denied(self):
        user = Mock()
        user.is_authenticated = False

        with self.assertRaises(PermissionDenied):
            require_school_permission(
                user=user,
                school_id=1,
                role_code="STUDENT",
            )

    def test_authenticated_user_is_denied_until_implemented(self):
        user = Mock()
        user.is_authenticated = True
        user.is_active = True

        with self.assertRaises(PermissionDenied):
            require_school_permission(
                user=user,
                school_id=1,
                role_code="TEACHER",
            )

    def test_school_admin_is_not_automatically_trusted(self):
        user = Mock()
        user.is_authenticated = True
        user.is_active = True

        with self.assertRaises(PermissionDenied):
            require_school_permission(
                user=user,
                school_id=2,
                role_code="SCHOOL_ADMIN",
            )