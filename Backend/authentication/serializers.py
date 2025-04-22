from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from .models import ContactMessage   # contacts import

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
   