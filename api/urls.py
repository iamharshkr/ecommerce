from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('products/', views.products, name='products'),
    path('orders/', views.orders, name='orders'),
]