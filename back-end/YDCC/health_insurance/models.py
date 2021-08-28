from django.db import models
from django.core.files.uploadedfile import InMemoryUploadedFile
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw


from citizen.models import Citizen


class HospitalStatus(object):
    WORKING     = "Đang hoạt động"
    NONWORKING  = "Ngừng hoạt động"
    CHOICES     = [
        (WORKING, WORKING),
        (NONWORKING, NONWORKING)
    ]


class HealthInsuranceCardType(models.Model):
    name                    = models.CharField(max_length=2)
    
    def __str__(self):
        return f"{self.id} | {self.name}" 

class RegimeBenefitType(models.Model):
    name                    = models.CharField(max_length=100)
    percent                 = models.FloatField()
    
    def __str__(self):
        return f"{self.id} | {self.name} | {self.percent}" 
    

class RegimeBenefit(models.Model):
    card_type               = models.ForeignKey(HealthInsuranceCardType, on_delete=models.CASCADE, null=True)
    regime_benefit_type_id  = models.ForeignKey(RegimeBenefitType, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return f"{self.id} | {self.card_type} | {self.regime_benefit_type_id}" 

    
class Hospital(models.Model):
    # KCD_id                  = models.CharField(max_length=12)
    name                    = models.CharField(max_length=100)
    address                 = models.CharField(max_length=256)
    license_id              = models.CharField(max_length=12)
    license_date            = models.DateField()
    status                  = models.CharField(
                                max_length=20,
                                choices=HospitalStatus.CHOICES
                            )
    type                    = models.CharField(max_length=256)
    head_certificate        = models.CharField(max_length=20)
    x_pos                   = models.FloatField()
    y_pos                   = models.FloatField()
    
    def __str__(self):
        return f"{self.id} | {self.name}" 
    
    
class HealthInsurance(models.Model):
    health_insurance_id     = models.CharField(max_length=26, unique=True, null=True)
    identity_id             = models.ForeignKey(Citizen, on_delete=models.CASCADE, null=True, unique=True)
    card_type               = models.ForeignKey(HealthInsuranceCardType, on_delete=models.CASCADE, null=True)
    licensing_authorities   = models.CharField(max_length=100)
    hospital_id             = models.ForeignKey(Hospital, on_delete=models.CASCADE, null=True)
    expiry_date             = models.CharField(max_length=200, null=True)
    picture                 = models.ImageField(upload_to='static/avatar')
    mi5cy_date              = models.DateField()
    qr_code                 = models.ImageField(upload_to='static/qrcode', blank=True, null=True)

    def save(self, *args, **kwargs):
        qrcode_img = qrcode.make(self.health_insurance_id)
        canvas = Image.new('RGB', (350, 350), 'white')
        canvas.paste(qrcode_img)
        fname = f'qr_code-{self.id}.png'
        buffer = BytesIO()
        canvas.save(buffer,'PNG')
        self.qr_code.save(fname, File(buffer), save=False)
        canvas.close()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.id} | {self.health_insurance_id} | {self.identity_id} | {self.identity_id.last_name}" 


class HealthRecord(models.Model):
    health_insurance_id     = models.ForeignKey(HealthInsurance, on_delete=models.CASCADE, null=True)
    hospital_id             = models.ForeignKey(Hospital, on_delete=models.CASCADE, null=True, related_name="health_insurance_hospital")
    symptom                 = models.CharField(max_length=1024, null=True)
    diagnose                = models.CharField(max_length=1024, null=True)
    treatment               = models.CharField(max_length=1024, null=True)
    doctor                  = models.CharField(max_length=100)
    note                    = models.CharField(max_length=1024, null=True)
    start_date              = models.DateTimeField()
    end_date                = models.DateTimeField()
    referral                = models.ForeignKey(Hospital, on_delete=models.CASCADE, blank=True, null=True, related_name="health_insurance_referral")
    re_examination          = models.DateTimeField(blank=True, null=True)
    organ_donor             = models.CharField(max_length=50, blank=True, null=True)
    emergency               = models.BooleanField()
    appropriate_levels      = models.BooleanField()
        
    class Meta:
        ordering = ('-end_date',)
        
    def __str__(self):
        return f"{self.id} | {self.health_insurance_id} | {self.hospital_id} | {self.end_date}" 