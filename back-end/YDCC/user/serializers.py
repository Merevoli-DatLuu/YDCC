from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, PasswordChangeSerializer

from .models import Account
from .validators import validate_secure_password


class AccountRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(required=True)
    phone = serializers.CharField(required=True)
    
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['name'] = self.validated_data.get('name', '')
        data['date_of_birth'] = self.validated_data.get('date_of_birth', '')
        data['phone'] = self.validated_data.get('phone', '')
        return data
    
    def save(self, request):
        if Account.objects.filter(phone=self.data.get('phone')).exists():
            raise serializers.ValidationError(
                "Phone number is duplicated"
            )
            
        user = super().save(request)
        user.name = self.data.get('name')
        user.date_of_birth = self.data.get('date_of_birth')
        user.phone = self.data.get('phone')
        user.save()
        return user
    
    
class AccountLoginSerializer(LoginSerializer):
    email = None
    

class AccountChangePasswordSerializer(PasswordChangeSerializer):
    new_password1 = serializers.CharField(max_length=128, validators = [validate_secure_password])   
    

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'name', 'date_of_birth', 'email', 'phone', 'picture', 'is_staff', 'date_joined', 'last_login']