from django.contrib import admin
from .models import Product, Order, Cart, CartItem, Categories

# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Categories)