from rest_framework import serializers
from .models import Employee
import time

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        read_only_fields = ('employee_id',)

    def validate_base_salary(self, value):
        if value <= 0:
            raise serializers.ValidationError("Base salary must be greater than zero.")
        return value

    def validate_bonuses(self, value):
        if value < 0:
            raise serializers.ValidationError("Bonuses cannot be negative.")
        return value

    def validate_deductions(self, value):
        if value < 0:
            raise serializers.ValidationError("Deductions cannot be negative.")
        return value

    def create(self, validated_data):
        timestamp = str(int(time.time()))[-5:]
        validated_data['employee_id'] = f"EMP-{timestamp}"
        return super().create(validated_data)
