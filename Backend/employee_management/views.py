from rest_framework import viewsets, permissions
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # You can change to AllowAny if needed
