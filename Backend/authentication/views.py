from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from .models import ContactMessage

authentication = get_user_model()


# ✅ Use ViewSet for ContactMessage
class ContactMessageViewSet(viewsets.ViewSet):
    queryset = authentication.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)


# ✅ Admin Registration ViewSet
class AdminRegisterViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_staff = True
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


# ✅ Employee Registration ViewSet
class EmployeeRegisterViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_staff = False
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


# ✅ Admin Login ViewSet
class AdminLoginViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)

            if user and user.is_staff:
                _, token = AuthToken.objects.create(user)
                return Response({
                    "user": UserSerializer(user).data,
                    "token": token
                })
            return Response({"error": "Invalid admin credentials"}, status=400)
        return Response(serializer.errors, status=400)


# ✅ Employee Login ViewSet
class EmployeeLoginViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)

            if user and not user.is_staff:
                _, token = AuthToken.objects.create(user)
                return Response({
                    "user": UserSerializer(user).data,
                    "token": token
                })
            return Response({"error": "Invalid employee credentials"}, status=400)
        return Response(serializer.errors, status=400)


def home(request):
    return HttpResponse("This is the home page")


# kriss


