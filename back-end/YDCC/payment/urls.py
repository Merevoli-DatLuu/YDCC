# payments/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('config', views.stripe_config),
    path('create-checkout-session', views.createCheckoutSession.as_view()),
    # path('webhook/', views.stripe_webhook),
]