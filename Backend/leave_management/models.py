from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class LeaveRequest(models.Model):
    LEAVE_TYPE_CHOICES = [
        ('casual', 'Casual Leave'),
        ('sick', 'Sick Leave'),
        ('earned', 'Earned Leave'),
    ]
    
    leave_type = models.CharField(max_length=10, choices=LEAVE_TYPE_CHOICES)

    # Rest of the fields...
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    from_date = models.DateField()
    to_date = models.DateField()
    leave_type = models.CharField(max_length=100)  # ✅ Make sure this exists
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.username} - {self.status}"
