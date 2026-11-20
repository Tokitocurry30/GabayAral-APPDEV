from unittest.mock import Mock

from django.core.exceptions import PermissionDenied
from django.test import SimpleTestCase

from accounts.security.school_admin import require_school_admin


class SchoolAdminPermissionTests(SimpleTestCase):

    def test_anonymous_user_is_denied(self):
        user = Mock()
        user.is_authenticated = False

        with self.assertRaises(PermissionDenied):
            require_school_admin(user, school_id=1)

    def test_missing_school_is_denied(self):
        user = Mock()
        user.is_authenticated = True

        with self.assertRaises(PermissionDenied):
            require_school_admin(user, school_id=None)

    def test_authenticated_user_without_verified_role_is_denied(self):
        user = Mock()
        user.is_authenticated = True

        with self.assertRaises(PermissionDenied):
            require_school_admin(user, school_id=1)

    def test_frontend_supplied_role_does_not_grant_access(self):
        user = Mock()
        user.is_authenticated = True
        user.role = "school_admin"

        with self.assertRaises(PermissionDenied):
            require_school_admin(user, school_id=1)