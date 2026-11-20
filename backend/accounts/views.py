from django.http import JsonResponse
from django.views.decorators.http import require_GET


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
            {"error": "Authentication required."},
            status=401,
        )

    # Do not expose school data until school-scoped
    # permissions are implemented.
    return JsonResponse(
        {
            "error": "School Admin authorization is not implemented.",
        },
        status=403,
    )