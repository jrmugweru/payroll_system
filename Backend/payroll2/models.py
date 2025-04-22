from django.db import models
from employee_management.models import Employee  # Assuming you have this model

class SalarySlip(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='salary_slips')
    month = models.CharField(max_length=20)
    year = models.IntegerField()
    base_salary = models.FloatField()
    attendance_pay = models.FloatField()
    bonuses = models.FloatField(default=0)
    overtime_pay = models.FloatField(default=0)
    deductions = models.FloatField(default=0)
    leave_deductions = models.FloatField(default=0)
    net_salary = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.name} - {self.month} {self.year}"
