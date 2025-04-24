from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaveRequestViewSet

router = DefaultRouter()
router.register('leave-requests', LeaveRequestViewSet, basename='leave-requests')

urlpatterns = [
    path('', include(router.urls)),
]
