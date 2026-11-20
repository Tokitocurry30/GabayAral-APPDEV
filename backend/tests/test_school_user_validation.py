from django.core.exceptions import ValidationError
from django.test import SimpleTestCase

from accounts.services.user_management import (
    validate_school_user_invitation,
)


class SchoolUserValidationTests(SimpleTestCase):

    def test_valid_teacher_invitation(self):
        result = validate_school_user_invitation({
            "email": "teacher@example.com",
            "role": "teacher",
        })

        self.assertEqual(
            result["role"],
            "teacher",
        )

    def test_valid_student_invitation(self):
        result = validate_school_user_invitation({
            "email": "student@example.com",
            "role": "student",
        })

        self.assertEqual(
            result["email"],
            "student@example.com",
        )

    def test_email_is_normalized(self):
        result = validate_school_user_invitation({
            "email": "  TEACHER@EXAMPLE.COM  ",
            "role": "teacher",
        })

        self.assertEqual(
            result["email"],
            "teacher@example.com",
        )

    def test_invalid_email_is_rejected(self):
        with self.assertRaises(ValidationError):
            validate_school_user_invitation({
                "email": "invalid-email",
                "role": "teacher",
            })

    def test_missing_email_is_rejected(self):
        with self.assertRaises(ValidationError):
            validate_school_user_invitation({
                "role": "student",
            })

    def test_unsupported_role_is_rejected(self):
        with self.assertRaises(ValidationError):
            validate_school_user_invitation({
                "email": "admin@example.com",
                "role": "platform_admin",
            })

    def test_invalid_request_data_is_rejected(self):
        with self.assertRaises(ValidationError):
            validate_school_user_invitation(None)