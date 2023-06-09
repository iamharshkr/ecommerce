from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import UserSerializer, ProductSerializer, OrderSerializer, CartSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Product, Order, Cart
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication


# Create your views here.
@api_view(['POST'])
def login(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            response = Response({'status': True, 'user':serializer.data})
            response.set_cookie('refresh_token', str(refresh))
            response.set_cookie('access_token', str(refresh.access_token))
            return response
        else:
            return Response({'status': False, 'error': 'Invalid credentials'}, status=401)
    except Exception as e:
        return Response({'status': False, 'error': str(e)}, status=500)
    

#logout
@api_view(['POST'])
def logout(request):
    try:
        response = Response({'status': True, "data": "Successfully logged out"})
        response.delete_cookie('refresh_token')
        response.delete_cookie('access_token')
        return response
    except Exception as e:
        return Response({'status': False, 'error': str(e)}, status=500)

@api_view(['POST'])
def register(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        user = User.objects.create_user(username=username, password=password, first_name=first_name, last_name=last_name, email=email)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            response = Response({'status': True, 'user':serializer.data})
            response.set_cookie('refresh_token', str(refresh), httponly=True)
            response.set_cookie('access_token', str(refresh.access_token), httponly=True)
            return response
        else:
            return Response({'status': False, 'error': 'Something went wrong!'}, status=403)
    except Exception as e:
        return Response({'status': False, 'error': str(e)}, status=500)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])  
def products(request):
    try:
        if request.method == "POST":
            product = ProductSerializer(data=request.data)
            if product.is_valid():
                product.save()
                serializer = ProductSerializer(product)
                return Response({'status': True, 'data': "Product added successfully"})
            
        elif request.method == "GET":
            id = request.GET.get('id', None)
            category = request.GET.get('category', None)
            products = Product.objects.all()
            if id is not None:
                products = products.filter(id=id)
            if category is not None:
                products = products.filter(category=category)
            serializer = ProductSerializer(products, many=True)
            return Response({'status': True, 'data': serializer.data})
    except Exception as e:
        return Response({'status': False, 'error': str(e)}, status=500)
    


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def orders(request):
    try:
        if request.method == "POST":
            order = OrderSerializer(data=request.data)
            if order.is_valid():
                order.save()
                return Response({'status': True, 'data': "Order placed successfully"})
        elif request.method == "GET":
            user = request.user
            orders = Order.objects.filter(user=user)
            serializer = OrderSerializer(orders, many=True)
            return Response({'status': True, 'data': serializer.data})
    except Exception as e:
        return Response({'status': False, 'error': str(e)}, status=500)
    
#cart view
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def carts(request):
    try:
        if request.method == "POST":
            # request.data._mutable = True
            data = {}
            data['user'] = request.user.id
            data["cart_items"] = request.data["cart_items"]
            cart = CartSerializer(data=data)
            print(data['cart_items'])
            if cart.is_valid():
                cart.save()
                return Response({'status': True, 'data': "Product addded to cart successfully"})
            return Response({
                "status": False,
                "error": cart.errors
            }, status=400)
        elif request.method == "GET":
            user = request.user
            orders = Cart.objects.filter(user=user)
            serializer = CartSerializer(orders, many=True)
            return Response({'status': True, 'data': serializer.data})
    except Exception as e:
        return Response({'status': False, 'error': str(e)}, status=500)
    
