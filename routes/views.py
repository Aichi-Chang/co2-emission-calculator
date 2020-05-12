from django.shortcuts import render
from django.http import Http404
from rest_framework import viewsets, filters, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from django.contrib.auth import get_user_model
from .models import PublicRoute, DriveRoute, CycleRoute, TravelBy
from .serializers import PublicRouteSerializer, DriveRouteSerializer, CycleRouteSerializer, TravelBySerializer, NestedTravelerSerializer, NestedPublicRouteSerializer, NestedDriveRouteSerializer, NestedCycleRouteSerializer

User = get_user_model()




# **************** Travel Type ****************

class TravelByView(generics.ListCreateAPIView):

    queryset = TravelBy.objects.all()
    serializer_class = TravelBySerializer


# **************** Public Route ****************

class PublicListView(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated, )
    queryset = PublicRoute.objects.all()
    serializer_class = NestedPublicRouteSerializer

    def get_queryset(self, _request):
        return PublicRoute.objects.filter(traveler=self.request.user)

    # def get(self, request):
    #     tubeRoute = TubeRoute.objects.filter(traveler=request.user)
    #     serialized_tube = NestedTubeRouteSerializer(tubeRoute, many=True)
    #     return Response(serialized_tube.data)

    def post(self, request):
        request.data['traveler'] = request.user.id
        # return super().post(self, request, *args, **kwargs)
        public = PublicRouteSerializer(data=request.data)
        if public.is_valid():
            public.save()
            return Response(public.data, status=HTTP_201_CREATED)
        return Response(public.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)


class PublicSingleView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (IsAuthenticated, )
    
    # def get_object(self, pk):
    #     try:
    #         return PublicRoute.objects.get(pk=pk)
    #     except PublicRoute.DoesNotExist:
    #         raise Http404

    def get(self, _request, pk, format=None, **kwargs):
        publicRoute = PublicRoute.objects.get(pk=pk)
        serialized_with_user = NestedPublicRouteSerializer(publicRoute)
        return Response(serialized_with_user.data)


    def put(self, request, pk, format=None, **kwargs):
        request.data['traveler'] = request.user.id
        publicRoute = PublicRoute.objects.get(pk=pk)
        if publicRoute.traveler.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        updated_serializer = PublicRouteSerializer(publicRoute)

        if updated_serializer.is_valid():
            updated_serializer.save()
            return Response(updated_serializer.data, status=status.HTTP_200_OK)
        return Response(updated_serializer.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)
            

    def delete(self, request, pk, format=None, **kwargs):
        publicRoute = PublicRoute.objects.get(pk=pk)
        if publicRoute.traveler.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        publicRoute.delete()
        message = {'Route Deleted'}
        return Response(message, status=status.HTTP_200_OK)


# **************** Drive Route ****************

class DriveListView(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated, )
    queryset = DriveRoute.objects.all()
    serializer_class = NestedDriveRouteSerializer

    def get_queryset(self, _request):
        return DriveRoute.objects.filter(traveler=self.request.user)

    # def get(self, request):
    #     driveRoute = DriveRoute.objects.filter(traveler=request.user)
    #     serialized_drive = NestedDriveRouteSerializer(driveRoute, many=True)
    #     return Response(serialized_drive.data)

    def post(self, request, format=None, **kwargs):
        request.data['traveler'] = request.user.id
        serializer = DriveRouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)


class DriveSingleView(APIView):

    permission_classes = (IsAuthenticated, )
    
    def get(self, _request, pk, format=None, **kwargs):
        driveRoute = DriveRoute.objects.get(pk=pk)
        serialized_with_user = NestedDriveRouteSerializer(driveRoute)
        return Response(serialized_with_user.data)


    def put(self, request, pk, format=None, **kwargs):
        request.data['traveler'] = request.user.id
        driveRoute = DriveRoute.objects.get(pk=pk)
        if driveRoute.traveler.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        updated_serializer = DriveRouteSerializer(driveRoute)

        if updated_serializer.is_valid():
            updated_serializer.save()
            return Response(updated_serializer.data, status=status.HTTP_200_OK)
        return Response(updated_serializer.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)
            

    def delete(self, request, pk, format=None, **kwargs):
        driveRoute = DriveRoute.objects.get(pk=pk)
        if driveRoute.traveler.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        driveRoute.delete()
        message = {'Route Deleted'}
        return Response(message, status=status.HTTP_200_OK)


# **************** Cycle Route ****************

class CycleListView(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated, )
    queryset = CycleRoute.objects.all()
    serializer_class = NestedCycleRouteSerializer

    def get_queryset(self, _request):
        return CycleRoute.objects.filter(traveler=self.request.user)

    def post(self, request, format=None, **kwargs):
        request.data['traveler'] = request.user.id
        serializer = CycleRouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)


class CycleSingleView(APIView):

    permission_classes = (IsAuthenticated, )
    
    def get(self, _request, pk, format=None, **kwargs):
        cycleRoute = CycleRoute.objects.get(pk=pk)
        serialized_with_user = NestedCycleRouteSerializer(cycleRoute)
        return Response(serialized_with_user.data)


    def put(self, request, pk, format=None, **kwargs):
        request.data['traveler'] = request.user.id
        cycleRoute = CycleRoute.objects.get(pk=pk)
        if cycleRoute.traveler.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        updated_serializer = CycleRouteSerializer(cycleRoute)

        if updated_serializer.is_valid():
            updated_serializer.save()
            return Response(updated_serializer.data, status=status.HTTP_200_OK)
        return Response(updated_serializer.errors, status=status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE)
            

    def delete(self, request, pk, format=None, **kwargs):
        cycleRoute = CycleRoute.objects.get(pk=pk)
        if cycleRoute.traveler.id != request.user.id:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        cycleRoute.delete()
        message = {'Route Deleted'}
        return Response(message, status=status.HTTP_200_OK)



# **************** User ****************

class TravelerSingleView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        traveler = User.objects.filter(id=request.user.id)
        serialized_with_all_routes = NestedTravelerSerializer(traveler, many=True)

        return Response(serialized_with_all_routes.data)


