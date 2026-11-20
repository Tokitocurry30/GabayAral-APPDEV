"""
GabayAral Authentication Service

Status: Blueprint only.

Authentication implementation is pending approval
of the API contract and physical database schema.
"""

from django.contrib.auth import authenticate


def authenticate_user(request, username, password):
    """
    Authenticate credentials using Django's
    configured authentication backend.

    Does not create a session or grant school access.
    """
    if not username or not password:
        return None

    return authenticate(
        request,
        username=username,
        password=password,
    )