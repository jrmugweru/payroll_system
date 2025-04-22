# from django.db import models
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class LeaveRequest(models.Model):
#     LEAVE_TYPE_CHOICES = [
#         ('SICK', 'Sick Leave'),
#         ('VACATION', 'Vacation'),
#         ('CASUAL', 'Casual Leave'),
#     ]

#     STATUS_CHOICES = [
#         ('PENDING', 'Pending'),
#         ('APPROVED', 'Approved'),
#         ('REJECTED', 'Rejected'),
#     ]

#     employee = models.ForeignKey(User, on_delete=models.CASCADE)
#     leave_type = models.CharField(max_length=20, choices=LEAVE_TYPE_CHOICES)
#     start_date = models.DateField()
#     end_date = models.DateField()
#     reason = models.TextField()
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.employee.name} - {self.leave_type} ({self.status})"

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class LeaveRequest(models.Model):
    LEAVE_TYPES = [
        ('casual', 'Casual Leave'),
        ('sick', 'Sick Leave'),
        ('earned', 'Earned Leave'),
    ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave_requests')
    from_date = models.DateField()
    to_date = models.DateField()
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    total_days = models.IntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.email} - {self.leave_type} ({self.status})"
