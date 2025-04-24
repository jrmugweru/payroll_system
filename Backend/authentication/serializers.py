from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from .models import ContactMessage   # contacts import
from .models import CustomerUser

 # start of contact serializer
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
 # end
 
User=get_user_model()
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('id','email','password')
        # extra_kwargs= {'password':{'write_only'=True}}
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
   
class LoginSerializer(serializers.Serializer):
    email= serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        rest = super().to_representation(instance)
        rest["password"] = None
        # rest.prop('password', None)
        return rest        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'is_staff')  # Add more fields as needed


class RegisterEmployeeSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomerUser
        fields = ['employee_id', 'email', 'password']

    def create(self, validated_data):
        user = CustomerUser(
            email=validated_data['email'],
            employee_id=validated_data['employee_id'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user