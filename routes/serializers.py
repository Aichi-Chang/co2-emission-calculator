from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TubeRoute, BusRoute, DriveRoute, CycleRoute



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


class TubeRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TubeRoute
        fields = '__all__'

class BusRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusRoute
        fields = '__all__'

class DriveRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriveRoute
        fields = '__all__'

class CycleRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CycleRoute
        fields = '__all__'
