from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, Cart

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for the products object"""

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    

class OrderSerializer(serializers.ModelSerializer):
    """Serializer for the products object"""

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        return Order.objects.create(**validated_data)
    

class CartSerializer(serializers.ModelSerializer):
    """Serializer for the products object"""

    class Meta:
        model = Cart
        fields = '__all__'

    def create(self, validated_data):
        return Cart.objects.create(**validated_data)