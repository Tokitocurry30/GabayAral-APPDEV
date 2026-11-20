"""
GabayAral School Admin Authorization

This module validates school-level access.

The membership lookup will be connected to the
approved database models later.
"""

from django.core.exceptions import PermissionDenied


def require_school_admin(user, school_id, membership=None):
    """
    Check whether a user has an approved School Admin
    role for a specific school.

    This is a temporary, fail-closed implementation.
    """

    if not user or not user.is_authenticated:
        raise PermissionDenied(
            "Authentication is required."
        )

    if not school_id:
        raise PermissionDenied(
            "A school must be selected."
        )

    # Never trust a role supplied by the frontend.
    # Membership and roles must be verified from
    # the database before granting access.

    raise PermissionDenied(
        "School Admin permission verification "
        "is not yet available."
    )