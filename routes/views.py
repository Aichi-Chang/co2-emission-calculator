from django.shortcuts import render
from django.http import Http404
from rest_framework import viewsets, filters, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
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

    def get(self, _request, format=None):
        tubeRoutes = TubeRoute.objects.all()
        serializer = TubeRouteSerializer(tubeRoutes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        request.data['owner'] = request.user.id
        serializer = TubeRouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)


class TubeSingleView(APIView):
    
    def get_object(self, pk):
        try:
            return TubeRoute.objects.get(pk=pk)
        except TubeRoute.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tubeRoute = self.objects.get(pk=pk)
        serializer = TubeRouteSerializer(tubeRoute)
        return Response(serializer.data)


    def put(self, request, pk, format=None):
        request.data['owner'] = request.user.id
        tubeRoute = self.get_object(pk)
        if tubeRoute.owner.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        updated_serializer = TubeRouteSerializer(tubeRoute)

        if updated_serializer.is_valid():
            updated_serializer.save()
            return Response(updated_serializer.data, status=status.HTTP_200_OK)
        return Response(updated_serializer.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)
            

    def delete(self, request, pk, format=None):
        tubeRoute = self.get_object(pk)
        if tubeRoute.owner.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        tubeRoute.delete()
        return Response(status=status.HTTP_200_OK)

