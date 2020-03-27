from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TubeRoute, BusRoute, DriveRoute, CycleRoute




# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'url', 'username', 'email']


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



# class UserSerializer(serializers.ModelSerializer):
#     tubeRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=TubeRoute.objects.all())
#     busRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=BusRoute.objects.all())
#     driveRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=DriveRoute.objects.all())
#     cycleRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=CycleRoute.objects.all())

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'tubeRoutes', 'busRoutes', 'driveRoutes', 'cycleRoutes']