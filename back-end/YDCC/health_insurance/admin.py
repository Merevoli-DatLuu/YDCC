from django.contrib import admin

from .models import HealthInsurance, HealthInsuranceCardType, HealthRecord, Hospital, RegimeBenefit, RegimeBenefitType


admin.site.register(HealthInsurance)
admin.site.register(HealthInsuranceCardType)
admin.site.register(HealthRecord)
admin.site.register(Hospital)
admin.site.register(RegimeBenefit)
admin.site.register(RegimeBenefitType)