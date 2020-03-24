from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from rest_framework import viewsets, filters
from django.contrib.auth import get_user_model
from .models import TubeRoute, BusRoute, DriveRoute, CycleRoute
from .serializers import UserSerializer, TubeRouteSerializer, BusRouteSerializer, DriveRouteSerializer, CycleRouteSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
        # """
        # API endpoint that allows users to be viewed or edited.
        # """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class TubeListView(APIView):

    def get(self, _request):
        tubeRoutes = TubeRoute.objects.all()
        serializer = TubeRouteSerializer(tubeRoutes, many=True)

        return Response(serializer.data)

    def post(self, request):
        request.data['owner'] = request.user.id
        tubeRoute = TubeRouteSerializer(data=request.data)
        if tubeRoute.is_valid():
            tubeRoute.save()
            return JsonResponse(tubeRoute.data, status=201)
        return JsonResponse(tubeRoute.data, status=400)


class TubeSingleView(APIView):

    def get(self, _request, pk):
        tubeRoute = TubeRoute.objects.get(pk=pk)
        serializer = TubeRouteSerializer(tubeRoute)

        return Response(serializer.data)

