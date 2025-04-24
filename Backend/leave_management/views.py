import logging
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from .models import LeaveRequest
from .serializers import LeaveRequestSerializer

# Set up logger
logger = logging.getLogger(__name__)

class LeaveRequestViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveRequestSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:  # Admin can view all leave requests
            return LeaveRequest.objects.all()
        return LeaveRequest.objects.filter(employee=self.request.user)  # Employee can only view their requests

    def perform_create(self, serializer):
        logger.info('Received data for creating a leave request: %s', self.request.data)  # Log incoming data
        try:
            serializer.save(employee=self.request.user)
        except Exception as e:
            logger.error('Error occurred while saving leave request: %s', str(e))  # Log any errors that occur
            raise e  # Reraise the exception after logging it
