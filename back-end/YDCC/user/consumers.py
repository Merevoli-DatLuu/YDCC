import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.core.exceptions import ObjectDoesNotExist
from asgiref.sync import sync_to_async

queue = []

class MessageConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope["user"]
        self.is_staff = self.user_id.is_staff
        await sync_to_async(print, thread_sensitive=True)(self.user_id) 
        await sync_to_async(print, thread_sensitive=True)(self.is_staff)
        await self.accept()
            
    async def receive(self, text_data):
        response = json.loads(text_data)
        message = response.get("type", None)
        
        data = {}
        
        if not self.is_staff and message == "push_queue":
            if self.user_id.username not in queue:
                queue.append(self.user_id.username)
            data = {
                "type": "success",
                "message": "push queue successfully"
            }
        elif self.is_staff and message == "pop_queue":
            if len(queue) > 0:
                username = queue[0]
                queue.pop(0)
                data = {
                    "type": "success",
                    "message": "pop queue successfully",
                    "username": username 
                }
            else:
                data = {
                    "type": "error",
                    "message": "queue is empty"
                }
                
        else:
            data = {
                "type": "error",
                "message": "wrong method"
            }
        
        
        await self.send(text_data=json.dumps(data))
        
            
    async def disconnect(self, code):
        pass
        