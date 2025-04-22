from rest_framework import serializers
from .models import SalarySlip

class SalarySlipSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalarySlip
        fields = '__all__'
