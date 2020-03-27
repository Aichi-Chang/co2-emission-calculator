from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings

import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):
    
    def authenticate(self, request):
        header = request.headers.get('Authentication')

        if not header:
            # the user continues as an unauthorised user,
            # they will NOT be able to perform any authorised actions.
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid Header Type'})

        token = header.replace('Bear ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            # sub is the user id
            user = User.objects.get(pk=payload.get('sub'))

        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})

        except User.DoesNotExist:
            raise PermissionDenied({'message': 'No such subject'})
        
        #  return a tuple containing what DRF should store as request.user, and request.auth
        return (user, token)
