from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView

from .models import HealthInsurance, HealthRecord, Hospital, RegimeBenefit
from .serializers import HealthInsuranceSerializer, HealthRecordSerializer, HospitalSerializer, BenefitInformationSerializer, SuggestHospitalSerializer
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
    serializer_class = SuggestHospitalSerializer
    queryset = Hospital.objects.all()
    
    def get_serializer_context(self):
        context = super(SuggestHospitalListView, self).get_serializer_context()
        citizen_id = Citizen.objects.get(identity_id=self.request.user.username)
        health_insurance_id = HealthInsurance.objects.get(identity_id=citizen_id)
        card_type = health_insurance_id.card_type
        benefit_info = RegimeBenefit.objects.get(card_type=card_type).regime_benefit_type_id.percent
        lat = self.request.query_params['lat']
        lon = self.request.query_params['lon']
        context.update({"my_health_insurance": health_insurance_id})
        context.update({"percent": benefit_info})
        context.update({"hospital": health_insurance_id.hospital_id})
        context.update({"position": (lat, lon)})
        
        return context
    
    def compare_key(elem):
        return [elem.percent, elem.distance]
    
    def get_response(self):
        response = super().get_response()
        hospitals = response.data
        hospitals.sort(key=self.compare_key)
        response.data = hospitals
        return response


class SuggestHospitalDistanceListView(ListAPIView):
    serializer_class = SuggestHospitalSerializer
    queryset = Hospital.objects.all()
    
    def get_serializer_context(self):
        context = super(SuggestHospitalDistanceListView, self).get_serializer_context()
        citizen_id = Citizen.objects.get(identity_id=self.request.user.username)
        health_insurance_id = HealthInsurance.objects.get(identity_id=citizen_id)
        card_type = health_insurance_id.card_type
        benefit_info = RegimeBenefit.objects.get(card_type=card_type).regime_benefit_type_id.percent
        lat = self.request.query_params['lat']
        lon = self.request.query_params['lon']
        context.update({"my_health_insurance": health_insurance_id})
        context.update({"percent": benefit_info})
        context.update({"hospital": health_insurance_id.hospital_id})
        context.update({"position": (lat, lon)})
        
        return context
    
    def compare_key(elem):
        return elem.distance
    
    def get_response(self):
        response = super().get_response()
        hospitals = response.data
        hospitals.sort(key=self.compare_key)
        response.data = hospitals
        return response