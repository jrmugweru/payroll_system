# from rest_framework import viewsets, permissions
# from .models import LeaveRequest
# from .serializers import LeaveRequestSerializer
# from rest_framework.decorators import action
# from rest_framework.response import Response

# class LeaveRequestViewSet(viewsets.ModelViewSet):
#     queryset = LeaveRequest.objects.all()
#     serializer_class = LeaveRequestSerializer

#     def get_permissions(self):
#         if self.action in ['approve', 'reject']:
#             return [permissions.IsAdminUser()]
#         return [permissions.IsAuthenticated()]

#     def perform_create(self, serializer):
#         serializer.save(employee=self.request.user)

#     def get_queryset(self):
#         user = self.request.user
#         if user.is_staff:
#             return LeaveRequest.objects.all()
#         return LeaveRequest.objects.filter(employee=user)

#     @action(detail=True, methods=['post'])
#     def approve(self, request, pk=None):
#         leave = self.get_object()
#         leave.status = 'APPROVED'
#         leave.save()
#         return Response({'status': 'Leave approved'})

#     @action(detail=True, methods=['post'])
#     def reject(self, request, pk=None):
#         leave = self.get_object()
#         leave.status = 'REJECTED'
#         leave.save()
#         return Response({'status': 'Leave rejected'})

from rest_framework import viewsets, permissions
from .models import LeaveRequest
from .serializers import LeaveRequestSerializer

class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]  # Employees can create
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]  # Only Admins can update/delete
        return [permissions.IsAuthenticated()]
