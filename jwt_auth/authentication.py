from rest_framework import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings

import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):
    
    def authenticate(self, request):
        header = request.headers.get('Authentication')

        if not header:
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid Header Type'})

        token = header.replace('Bear ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})
        except User.DoesNotExist:
            reaise PermissionDenied({'message': 'No such subject'})  

        return (user, token)
