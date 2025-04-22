from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SalarySlipViewSet

router = DefaultRouter()
router.register(r'salaryslips', SalarySlipViewSet, basename='salaryslip')

urlpatterns = [
    path('', include(router.urls)),
]
