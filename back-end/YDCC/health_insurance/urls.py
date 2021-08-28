from django.urls import path

from .views import (HealthInsuranceView, HospitalView, HealthRecordView, BenefitInformationView)


urlpatterns = [
    path('health_insurance/',       HealthInsuranceView.as_view()),
    path('hospital/<int:pk>',       HospitalView.as_view()),
    path('healthy_record/',         HealthRecordView.as_view()),
    path('benefit_information/',    BenefitInformationView.as_view()),
]