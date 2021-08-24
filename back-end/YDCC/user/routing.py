  
from django.urls import path

from .consumers import MessageConsumer

ws_urlpatterns = [
    path('ws/message_queue', MessageConsumer.as_asgi()),
]