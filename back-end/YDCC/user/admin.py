from django.contrib import admin

from .models import Account


class AccountAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_staff', 'is_active', 'last_login')


admin.site.register(Account, AccountAdmin)