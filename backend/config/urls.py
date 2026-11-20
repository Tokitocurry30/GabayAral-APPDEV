from django.contrib import admin
from django.urls import include, path
from .views import health_check

urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication API
    path("api/auth/", include("accounts.urls")),

    # Backend Health Check
    path("api/health/", health_check, name="health_check"),
]