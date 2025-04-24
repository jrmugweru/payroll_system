from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from knox.auth import TokenAuthentication
from .models import Employee
from .serializers import EmployeeSerializer
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Adjust permissions as needed
    authentication_classes = [TokenAuthentication]  # Adjust if using a different auth method

    def create(self, request, *args, **kwargs):
        print(f"Received request data for creation: {request.data}")  # Log the incoming data
        
        # Try to create the employee and catch any validation errors
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            print(f"Error occurred while creating employee: {e}")
            return Response({"error": "Failed to create employee", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        print(f"Received request data for update: {request.data}")  # Log the incoming data
        
        # Try to update the employee and catch any validation errors
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            print(f"Error occurred while updating employee: {e}")
            return Response({"error": "Failed to update employee", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        print(f"Attempting to delete employee with ID: {kwargs.get('pk')}")  # Log the employee being deleted
        
        # Try to delete the employee and catch any errors
        try:
            return super().destroy(request, *args, **kwargs)
        except Exception as e:
            print(f"Error occurred while deleting employee: {e}")
            return Response({"error": "Failed to delete employee", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def generate_salary_slip(request, employee_id):
    try:
        employee = Employee.objects.get(pk=employee_id)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename=salary_slip_{employee.employee_id}.pdf'

        p = canvas.Canvas(response)
        p.setFont("Helvetica-Bold", 16)
        p.drawString(100, 800, "Salary Slip")

        y = 750
        details = [
            f"Name: {employee.name}",
            f"Department: {employee.department}",
            f"Designation: {employee.designation}",
            f"Base Salary: KES {employee.base_salary}",
            f"Bonuses: KES {employee.bonuses}",
            f"Deductions: KES {employee.deductions}",
            f"Net Salary: KES {employee.base_salary + employee.bonuses - employee.deductions}",
            f"Joining Date: {employee.joining_date}",
        ]

        for line in details:
            p.drawString(100, y, line)
            y -= 30

        p.showPage()
        p.save()
        return response

    except Employee.DoesNotExist:
        return HttpResponse("Employee not found", status=404)
