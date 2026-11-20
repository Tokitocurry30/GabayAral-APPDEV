"""
GabayAral Authentication API Routes

Status: Planning only

Endpoints will be added after approval of
Authentication API Contract v0.1.
"""

from django.urls import path

from django.urls import path
from .views import school_admin_dashboard

app_name = "accounts"

urlpatterns = [
    # Proposed endpoints (not implemented):
    #
    # POST /api/auth/register/
    # POST /api/auth/login/
    # POST /api/auth/logout/
    # GET  /api/auth/me/
    # POST /api/auth/forgot-password/
    # POST /api/auth/reset-password/
    # POST /api/auth/verify-email/
    # POST /api/auth/resend-verification/
    # GET  /api/auth/schools/
    # POST /api/auth/select-school/
]


app_name = "accounts"

urlpatterns = [
    path(
        "school-admin/dashboard/",
        school_admin_dashboard,
        name="school_admin_dashboard",
    ),
]