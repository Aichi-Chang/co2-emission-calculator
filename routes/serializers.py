from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TubeRoute, BusRoute, DriveRoute, CycleRoute, TravelBy
from django.contrib.auth import get_user_model

User = get_user_model()


class TravelBySerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelBy
        fields = '__all__'



class TravelerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # tubeRoutes is hooked with models related_name
        fields = ('id', 'username', 'tubeRoutes', 'busRoutes')


class TubeRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TubeRoute
        fields = ('id', 'depart', 'arrive', 'departTime', 'arriveTime', 'duation', 'direction', 'departLon', 'departLat', 'arrivalLon', 'arrivalLat', 'carbonPrint', 'traveler', 'travelBy')


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


class NestedTubeRouteSerializer(TubeRouteSerializer):

    traveler = TravelerSerializer()


class NestedBusRouteSerializer(BusRouteSerializer):

    traveler = TravelerSerializer()


class NestedDriveRouteSerializer(DriveRouteSerializer):

    traveler = TravelerSerializer()


class NestedCycleRouteSerializer(CycleRouteSerializer):

    # travelBy = TravelBySerializer()
    traveler = TravelerSerializer()


class NestedTravelerSerializer(TravelerSerializer):

    # hooked with models' related_name= ''
    tubeRoutes = TubeRouteSerializer(many=True)
    busRoutes = BusRouteSerializer(many=True)  










# class UserSerializer(serializers.ModelSerializer):
#     tubeRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=TubeRoute.objects.all())
#     busRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=BusRoute.objects.all())
#     driveRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=DriveRoute.objects.all())
#     cycleRoutes = serializers.PrimaryKeyRelatedField(many=True, queryset=CycleRoute.objects.all())

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'tubeRoutes', 'busRoutes', 'driveRoutes', 'cycleRoutes']