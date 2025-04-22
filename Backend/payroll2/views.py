from rest_framework import viewsets
from .models import SalarySlip
from .serializers import SalarySlipSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class SalarySlipViewSet(viewsets.ModelViewSet):
    queryset = SalarySlip.objects.all()
    serializer_class = SalarySlipSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
