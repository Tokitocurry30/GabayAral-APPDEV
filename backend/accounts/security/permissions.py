"""
GabayAral School Authorization

Status: Blueprint only.

No school access is granted until the approved
membership and role models are implemented.
"""

from django.core.exceptions import PermissionDenied


def require_school_permission(
    user,
    school_id,
    role_code,
    resource=None,
):
    """
    Future authorization entry point.

    Required checks:
    1. Authenticated and active user
    2. Active school membership
    3. Approved and active school role assignment
    4. School ownership of the requested resource
    5. Exact resource-level authorization
    """

    raise PermissionDenied(
        "School authorization is not implemented."
    )