from django.urls import path, include
from .views import EmployeeViewSet, generate_salary_slip
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("employees", EmployeeViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("generate-salary-slip/<str:employee_id>/", generate_salary_slip, name="generate-salary-slip"),
]
