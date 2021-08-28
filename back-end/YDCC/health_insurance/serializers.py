from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import HealthInsurance, HealthInsuranceCardType, HealthRecord, Hospital, HospitalStatus
from citizen.models import Citizen
from .services import get_position_distance
import datetime
import pytz


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


class SuggestHospitalSerializer(serializers.ModelSerializer):
    percent = serializers.SerializerMethodField()
    distance = serializers.SerializerMethodField()
    
    class Meta:
        model = Hospital
        fields = '__all__'

        
    def get_percent(self, obj):
        percent = self.context.get('percent')
        hospital = self.context.get('hospital')
        
        d1 = hospital.address.split(',')
        d2 = obj.address.split(',')
        city1 = d1[-1].strip().lower()
        city2 = d2[-1].strip().lower()
        district1 = d1[-2].strip().lower()
        district2 = d2[-2].strip().lower()
        hospitals = HealthRecord.objects.filter(health_insurance_id = self.context.get('my_health_insurance'))
        
        level = 1
        
        if city1 == city2:
            if district1 == district2:
                level = 1
            else:
                level = 2
        else:
            level = 3
            
        if obj.central_line == True:
            level = 4
        else:
            p1 = hospitals[0]
            if p1.re_examination != None and p1.re_examination.date() == datetime.datetime.now().date():
                level = 1
            
            if p1.referral and p1.referral == obj:
                level = 1
            
            print(pytz.utc.localize(datetime.datetime.now()))
            print(p1.end_date)
            if p1.organ_donor != "" and (pytz.utc.localize(datetime.datetime.now()) - p1.end_date).days <= 7:
                level = 1
        
        level_map = {
            '1': 100.0,
            '2': 100.0,
            '3': 60.0,
            '4': 40.0
        }
        
        return int(level_map[str(level)]*percent/100)
            
    def get_distance(self, obj):
        return get_position_distance(self.context.get('position'), (obj.x_pos, obj.y_pos))