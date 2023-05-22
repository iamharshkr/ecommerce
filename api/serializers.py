from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, Cart, CartItem

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
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all())

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        return Order.objects.create(**validated_data)
    

# cart_item
class CartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ['product', 'quantity']

# cart
class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = '__all__'

    def create(self, validated_data):
        cart_items_data = validated_data.pop('cart_items')
        cart = Cart.objects.create(user=validated_data['user'])
        for cart_item_data in cart_items_data:
            product = Product.objects.get(pk=cart_item_data['product'])
            cart_item = CartItem.objects.create(cart=cart, product=product, **cart_item_data)
            cart.cart_items.add(cart_item)
        return cart