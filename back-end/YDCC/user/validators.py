from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

import re


def validate_secure_password(value):
    """
    Check password length >= 8 and contains alphabets & digits
    """

    if len(value) < 8:
        raise ValidationError(
            _("Password length at least 8 characters ")
        )

    have_upper_alphabets = False
    have_lower_alphabets = False
    have_digits = False
    have_special_char = False

    for c in value:
        if c.isalpha():
            if 'A' <= c <= 'Z':
                have_upper_alphabets = True
            elif 'a' <= c <= 'z':
                have_lower_alphabets = True
        elif c.isdigit():
            have_digits = True
        else:
            have_special_char = True

    if not (have_upper_alphabets and have_lower_alphabets and have_digits and have_special_char):
        raise ValidationError(
            _("Password must have alphabets and digits")
        )

def validate_phone_number(value):
    if not bool(re.match(r"^(84|0[3|5|7|8|9])[0-9]{8}$", value)):
        raise ValidationError(
            _("Wrong format phone number")
        )