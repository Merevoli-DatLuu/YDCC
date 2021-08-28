from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import HealthInsurance, HealthInsuranceCardType, HealthRecord, Hospital, HospitalStatus
from citizen.models import Citizen

class HealthInsuranceSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    date_of_birth = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    
    class Meta:
        model = HealthInsurance
        fields = '__all__'
        
    def get_name(self, obj):
        person = obj.identity_id
        return person.last_name + ' ' + person.first_name
    
    def get_date_of_birth(self, obj):
        return obj.identity_id.date_of_birth
    
    def get_address(self, obj):
        return obj.hospital_id.address
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['identity_id'] = instance.identity_id.identity_id
        ret['card_type'] = instance.card_type.name
        ret['hospital_name'] = instance.hospital_id.name
        return ret
    

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'
        
    
class HealthRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    hospital_name = serializers.SerializerMethodField()
    hospital_referral_name = serializers.SerializerMethodField()
    
    class Meta:
        model = HealthRecord
        fields = '__all__'
        
    def get_patient_name(self, obj):
        patient = obj.health_insurance_id.identity_id
        return patient.last_name + ' ' + patient.first_name

    def get_hospital_name(self, obj):
        return obj.hospital_id.name
    
    def get_hospital_referral_name(self, obj):
        if obj.referral:
            return obj.referral.name
        else:
            return ""
        
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['health_insurance_id'] = instance.health_insurance_id.health_insurance_id

        return ret
    
    
class BenefitInformationSerializer(serializers.Serializer):
    level_1 = serializers.SerializerMethodField()
    level_2 = serializers.SerializerMethodField()
    level_3 = serializers.SerializerMethodField()
    level_4 = serializers.SerializerMethodField()
    
    def get_level_1(self, obj):
        percent = self.context.get("percent")
        return f"Được hưởng {percent}% chi phí khám bệnh, chữa bệnh trong phạm vi được hưởng BHYT"

    def get_level_2(self, obj):
        percent = self.context.get("percent")
        return f"Trong trường hợp điều trị nội trú trái tuyến tại các cơ sở khám chữa bệnh tuyến huyện sẽ được hưởng {percent}%"
    
    def get_level_3(self, obj):
        percent = self.context.get("percent")
        return f"Trong trường hợp điều trị nội trú trái tuyến tại các cơ sở khám chữa bệnh tuyến tỉnh sẽ được hưởng {int(percent*60/100)}% (TH trên thẻ có mã nơi sinh sống là K1, K2, K3 sẽ được {percent}%)"
    
    def get_level_4(self, obj):
        percent = self.context.get("percent")
        return f"Trong trường hợp điều trị nội trú trái tuyến tại các cơ sở khám chữa bệnh tuyến trung ương sẽ được hưởng {int(percent*40/100)}% (TH trên thẻ có mã nơi sinh sống là K1, K2, K3 sẽ được {percent}%)"
