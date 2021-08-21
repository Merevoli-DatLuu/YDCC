from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager
from .validators import validate_secure_email, validate_phone_number


class User(AbstractBaseUser):
    username        = models.CharField(max_length=100, unique=True)
    password        = models.CharField(max_length=100)
    email           = models.EmailField(max_length=100, validators=[validate_secure_email], unique=True)
    phone_number    = models.CharField(max_length=20, validators=[validate_phone_number], unique=True)
    
    date_joined     = models.DateTimeField(auto_now_add=True)
    last_login      = models.DateTimeField(auto_now=True)
    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'phone_number', 'password']

    objects = UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True