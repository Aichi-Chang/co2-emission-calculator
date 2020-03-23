from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from rest_framework import viewsets, filters
from django.contrib.auth import get_user_model

from .models import TubeRoute, BusRoute, DriveRoute, CycleRoute
from .serializers import TubeRouteSerializer, BusRouteSerializer, DriveRouteSerializer, CycleRouteSerializer

# Create your views here.

class TubeListView(APIView):

    def get(self, _request):
        tubeRoutes = TubeRoute.objects.all()
        serializer = TubeRouteSerializer(tubeRoutes, many=True)

        return Response(serializer.data)

class TubeSingleView(APIView):

    def get(self, _request, pk):
        tubeRoute = TubeRoute.objects.get(pk= pk)
        serializer = TubeRouteSerializer(tubeRoute)

        return Response(serializer.data)

