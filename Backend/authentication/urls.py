# from django.urls import path
# from .views import home


# urlpatterns = [
#     path('', home, name='home'),
# ]
from django.urls import path, include
from . import views  # ✅ Import views correctly
from rest_framework.routers import DefaultRouter
from .views import AdminRegisterViewSet,EmployeeRegisterViewSet,EmployeeLoginViewSet, AdminLoginViewSet, ContactMessageViewSet




router = DefaultRouter()
router.register("admin/register", AdminRegisterViewSet, basename="admin-register")
router.register("admin/login", AdminLoginViewSet, basename="admin-login")
router.register("contact", ContactMessageViewSet, basename="contact-message")
router.register("employee/register", EmployeeRegisterViewSet, basename="employee-register")
router.register("employee/login", EmployeeLoginViewSet, basename="employee-login")
urlpatterns = [
    path("", views.home, name="home"),  # ✅ Ensure `home` view exists in `views.py`
    path("", include(router.urls)),
    
]