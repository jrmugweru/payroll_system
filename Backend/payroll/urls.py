# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("", include("api.urls")),
# ]

from django.contrib import admin
from django.urls import path, include
from authentication.views import home  # ✅ Import the home view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),  # ✅ Now "/" works
    path("authentication/", include("authentication.urls")),  # ✅ "/api/" also works
    path("authentication/auth/", include("knox.urls")),
    path("employee-management/", include("employee_management.urls")),
    path("payroll/", include("payroll2.urls")),
    path("leave-management/", include("leave_management.urls")),



]