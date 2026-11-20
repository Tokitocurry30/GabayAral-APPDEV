"""
GabayAral School User Management Validation

Validates incoming user invitation data.

This service does not create accounts,
assign roles, or modify the database.
"""

from django.core.exceptions import ValidationError
from django.core.validators import validate_email


ALLOWED_ROLES = {
    "teacher",
    "student",
    "parent",
}


def validate_school_user_invitation(data):
    if not isinstance(data, dict):
        raise ValidationError("Invalid request data.")

    email = data.get("email")
    role = data.get("role")

    if not isinstance(email, str) or not email.strip():
        raise ValidationError({
            "email": ["Email is required."]
        })

    email = email.strip().lower()

    validate_email(email)

    if not isinstance(role, str):
        raise ValidationError({
            "role": ["A valid role is required."]
        })

    role = role.strip().lower()

    if role not in ALLOWED_ROLES:
        raise ValidationError({
            "role": ["Unsupported school user role."]
        })

    return {
        "email": email,
        "role": role,
    }