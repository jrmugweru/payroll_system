# from rest_framework import serializers
# from .models import LeaveRequest

# class LeaveRequestSerializer(serializers.ModelSerializer):
#     employee_name = serializers.CharField(source='employee.name', read_only=True)

#     class Meta:
#         model = LeaveRequest
#         fields = '__all__'
#         read_only_fields = ['status', 'employee', 'created_at']

from rest_framework import serializers
from .models import LeaveRequest

class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = '__all__'
