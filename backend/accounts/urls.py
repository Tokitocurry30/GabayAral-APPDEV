"""
GabayAral Authentication and School Admin API Routes

Authentication endpoints are planned.

School Admin dashboard and user invitation routes
are registered but remain protected until
school-scoped authorization is implemented.
"""

from django.urls import path

from .views import (
    school_admin_dashboard,
    invite_school_user,
    login_user,
)

app_name = "accounts"


urlpatterns = [

    # ==========================================
    # AUTHENTICATION API (PLANNED)
    # ==========================================

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


    # ==========================================
    # SCHOOL ADMIN DASHBOARD
    # ==========================================

    path(
        "school-admin/dashboard/",
        school_admin_dashboard,
        name="school_admin_dashboard",
    ),


    # ==========================================
    # SCHOOL ADMIN USER MANAGEMENT
    # ==========================================

    path(
        "school-admin/users/invite/",
        invite_school_user,
        name="invite_school_user",
    ),

    path(
    "login/",
    login_user,
    name="login",
),

]