from rest_framework import serializers
from .models import Employee
import time

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

    def create(self, validated_data):
        timestamp = str(int(time.time()))[-5:]  # Last 5 digits of timestamp
        validated_data['employee_id'] = f"EMP-{timestamp}"
        return super().create(validated_data)   

