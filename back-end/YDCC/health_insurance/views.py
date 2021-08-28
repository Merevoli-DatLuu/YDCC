from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import HealthInsurance, HealthRecord, Hospital, RegimeBenefit
from .serializers import HealthInsuranceSerializer, HealthRecordSerializer, HospitalSerializer, BenefitInformationSerializer
from citizen.models import Citizen


class HealthInsuranceView(RetrieveAPIView):
    serializer_class = HealthInsuranceSerializer
    queryset = HealthInsurance.objects.all()

    def get_object(self):
        identity_id = Citizen.objects.get(identity_id = self.request.user.username)
        return get_object_or_404(HealthInsurance, identity_id=identity_id)


class BenefitInformationView(RetrieveAPIView):
    serializer_class = BenefitInformationSerializer
    queryset = HealthInsurance.objects.all()

    def get_object(self):
        citizen_id = Citizen.objects.get(identity_id=self.request.user.username)
        return HealthInsurance.objects.get(identity_id=citizen_id)

    def get_serializer_context(self):
        context = super(BenefitInformationView, self).get_serializer_context()
        citizen_id = Citizen.objects.get(identity_id=self.request.user.username)
        health_insurance_id = HealthInsurance.objects.get(identity_id=citizen_id)
        card_type = health_insurance_id.card_type
        benefit_info = RegimeBenefit.objects.get(card_type=card_type).regime_benefit_type_id.percent
        
        context.update({"percent": benefit_info})
        return context


class HospitalView(RetrieveAPIView):
    serializer_class = HospitalSerializer
    queryset = Hospital.objects.all()


class HealthRecordView(ListAPIView):
    serializer_class = HealthRecordSerializer

    def get_queryset(self):
        citizen_id = Citizen.objects.get(identity_id=self.request.user.username)
        health_insurance_id = HealthInsurance.objects.get(identity_id=citizen_id)
        return HealthRecord.objects.filter(health_insurance_id=health_insurance_id)


class SuggestHospitalListView(ListAPIView):
    pass
