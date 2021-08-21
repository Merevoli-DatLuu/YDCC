from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import re

def validate_secure_email(value):
    """
    Check email length >= 8 and contains alphabets & digits
    """

    if len(value) < 8:
        raise ValidationError(
            _("Email length at least 8 characters ")
        )

    have_alphabets = False
    have_digits = False

    for c in value:
        if c.isalpha():
            have_alphabets = True
        if c.isdigit():
            have_digits = True
        if have_alphabets and have_digits:
            break

    if not (have_alphabets and have_digits):
        raise ValidationError(
            _("Email must have alphabets and digits")
        )

def validate_phone_number(value):
    if not bool(re.match(r"^(84|0[3|5|7|8|9])[0-9]{8}$", value)):
        raise ValidationError(
            _("Wrong format phone number")
        )