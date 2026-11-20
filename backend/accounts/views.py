from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.http import require_POST

# ==========================================
# SCHOOL ADMIN DASHBOARD API
# ==========================================

@require_GET
def school_admin_dashboard(request):
    """
    School Admin dashboard endpoint.

    Requires authentication.
    School-specific permissions will be added
    after the approved membership schema is implemented.
    """

    if not request.user.is_authenticated:
        return JsonResponse(
            {
                "error": "Authentication required."
            },
            status=401,
        )

    # School-scoped authorization is not implemented yet.
    # Deny access until the user's school membership
    # and approved role can be verified.

    return JsonResponse(
        {
            "error": "School Admin authorization is not implemented."
        },
        status=403,
    )


# ==========================================
# SCHOOL ADMIN USER INVITATION API
# ==========================================

@require_POST
def invite_school_user(request):
    """
    School Admin user invitation endpoint.

    This endpoint will eventually allow School Admins
    to invite teachers, students, and parents.

    Currently protected until school membership
    and role authorization are implemented.
    """

    if not request.user.is_authenticated:
        return JsonResponse(
            {
                "error": "Authentication required."
            },
            status=401,
        )

    # Do not trust frontend-provided roles.
    # The backend must verify School Admin permissions
    # before allowing invitations.

    return JsonResponse(
        {
            "error": "School Admin authorization is not implemented."
        },
        status=403,
    )
# ==========================================
# AUTHENTICATION - LOGIN API
# ==========================================

@require_POST
def login_user(request):
    """
    Authenticate a GabayAral user.

    Uses Django session authentication.
    """

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"error": "Invalid JSON request."},
            status=400,
        )

    if not isinstance(data, dict):
        return JsonResponse(
            {"error": "Request body must be a JSON object."},
            status=400,
        )

    username = data.get("username")
    password = data.get("password")

    if (
        not isinstance(username, str)
        or not isinstance(password, str)
        or not username.strip()
        or not password
    ):
        return JsonResponse(
            {"error": "Username and password are required."},
            status=400,
        )

    user = authenticate(
        request,
        username=username.strip(),
        password=password,
    )

    if user is None:
        return JsonResponse(
            {"error": "Invalid username or password."},
            status=401,
        )

    login(request, user)

    return JsonResponse(
        {
            "message": "Login successful.",
            "user": {
                "id": user.pk,
                "username": user.get_username(),
            },
        },
        status=200,
    )