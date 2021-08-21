from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from .managers import AccountManager
from .validators import validate_secure_password, validate_phone_number


class Account(AbstractBaseUser, PermissionsMixin):
    username        = models.CharField(max_length=20, unique=True)
    password        = models.CharField(_('password'), max_length=128, validators=[validate_secure_password])
    name            = models.CharField(max_length=150)
    date_of_birth   = models.DateField(blank=True, null=True)
    email           = models.EmailField(unique=True)
    phone           = models.CharField(max_length=50, unique=True, validators=[validate_phone_number])
    picture         = models.ImageField(blank=True, null=True)
    is_staff        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    date_joined     = models.DateTimeField(default=timezone.now)
    last_login      = models.DateTimeField(null=True)

    objects = AccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'email', 'phone']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name.split()[0]