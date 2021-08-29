from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date
from .models import HealthRecord
from user.models import Account
from .utils import EmailSending
from django.db.models import Q



DAYS_TO_REMINDER = 2

@shared_task(name='re_examination_reminder')
def delete_posts():
    current_date = date.today()
    health_records = HealthRecord.objects.filter(~Q(re_examination=None))
    reminder_records = [h for h in health_records if (current_date - h.re_examination.date()).days >= DAYS_TO_REMINDER]
    
    for rr in reminder_records:
        user            = Account.objects.get(username=rr.health_insurance_id.identity_id.identity_id)
        email_body      = f'Xin chào {user.name},\n Bạn có lịch hẹn tái khám ở {rr.hospital_id.name} vào ngày {rr.re_examination}'
        data            = {
                            'email_body': email_body, 
                            'to_email': user.email,
                            'email_subject': 'Verify your email'
                        }
        
        EmailSending.send_email(data)