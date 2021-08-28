from django.urls import path

from .views import (HealthInsuranceView, HospitalView, HealthRecordView, BenefitInformationView, SuggestHospitalListView, SuggestHospitalDistanceListView)


urlpatterns = [
    path('health_insurance/',               HealthInsuranceView.as_view()),
    path('hospital/<int:pk>',               HospitalView.as_view()),
    path('healthy_record/',                 HealthRecordView.as_view()),
    path('benefit_information/',            BenefitInformationView.as_view()),
    path('suggest_hospital/',               SuggestHospitalListView.as_view()),
    path('suggest_hospital/distance/',      SuggestHospitalDistanceListView.as_view()),
]