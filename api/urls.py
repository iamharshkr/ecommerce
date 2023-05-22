from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),
    path('products/', views.products, name='products'),
    path('orders/', views.orders, name='orders'),
    path('carts/', views.carts, name='carts'),
]