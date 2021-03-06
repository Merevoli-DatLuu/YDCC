from rest_framework.generics import RetrieveAPIView
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, PasswordChangeView

from .serializers import AccountRegisterSerializer, AccountLoginSerializer, AccountChangePasswordSerializer, AccountSerializer
from .models import Account


class AccountRegisterView(RegisterView):
    serializer_class = AccountRegisterSerializer
    queryset = Account.objects.all()


class AccountLoginView(LoginView):
    serializer_class = AccountLoginSerializer

    def get_response(self):
        response = super().get_response()
        response.data['user']['is_staff'] = Account.objects.get(id = response.data['user']['pk']).is_staff
        return response


class AccountChangePasswordView(PasswordChangeView):
    serializer_class = AccountChangePasswordSerializer
    
        
class AccountProfileView(RetrieveAPIView):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def get_object(self):
        return self.request.user
