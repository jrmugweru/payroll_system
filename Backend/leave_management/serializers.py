from rest_framework import serializers
from .models import LeaveRequest

class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = '__all__'
        read_only_fields = ['employee', 'submitted_at']

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if not user.is_staff and 'status' in validated_data:
            raise serializers.ValidationError("Only admins can update the status.")
        return super().update(instance, validated_data)
