from django.urls import path

from .views import (AccountLoginView, AccountRegisterView, AccountProfileView, AccountChangePasswordView)
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('register',                                    AccountRegisterView.as_view(),          name='user-register'),
    path('verify-user',                                 VerifyEmailView.as_view(),              name='user-verify'),
    path('login',                                       AccountLoginView.as_view(),             name='user-login'),
    path('change-password',                             AccountChangePasswordView.as_view(),    name='user-change-password'),
    path('reset-password',                              PasswordResetView.as_view(),            name='user-reset-password'),
    path('reset-confirm-password/<uidb64>/<token>/',    PasswordResetConfirmView.as_view(),     name='password_reset_confirm'),
    path('me',                                          AccountProfileView.as_view(),           name='user-current-user'),
]