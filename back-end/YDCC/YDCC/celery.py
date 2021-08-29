from __future__ import absolute_import, unicode_literals
import os
from celery import Celery, shared_task
from django.conf import settings
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'YDCC.settings')

app = Celery('YDCC', broker="redis://localhost:6379/0")
app.config_from_object('django.conf:settings', namespace='CELERY_YDCC')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'delete-expired-post-every-morning': {
        'task': 'delete-post',
        'schedule': crontab(hour=8, minute=0),
    }
}