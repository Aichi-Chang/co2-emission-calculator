from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.

class TravelBy(models.Model):
    type = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.type}'




class TubeRoute(models.Model):
    traveler = models.ForeignKey(User, related_name='TubeRoute', on_delete=models.CASCADE, default=1)
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.ForeignKey(TravelBy, max_length=20, related_name='TubeRoute', on_delete=models.DO_NOTHING, default=1)
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.FloatField()
    direction = models.TextField()
    departLon = models.FloatField()
    departLat = models.FloatField()
    arrivalLon = models.FloatField()
    arrivalLat = models.FloatField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.traveler}: {self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'


class BusRoute(models.Model):
    traveler = models.ForeignKey(User, related_name='BusRoute', on_delete=models.CASCADE, default=1)
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.ForeignKey(TravelBy, max_length=20, related_name='BusRoute', on_delete=models.DO_NOTHING, default=1)
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.FloatField()
    direction = models.TextField()
    departLon = models.IntegerField()
    departLat = models.IntegerField()
    arrivalLon = models.IntegerField()
    arrivalLat = models.IntegerField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.traveler}: {self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'

class DriveRoute(models.Model):
    traveler = models.ForeignKey(User, related_name='DriveRoute', on_delete=models.CASCADE, default=1)
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.ForeignKey(TravelBy, max_length=20, related_name='DriveRoute', on_delete=models.DO_NOTHING, default=1)
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.FloatField()
    direction = models.TextField()
    departLon = models.IntegerField()
    departLat = models.IntegerField()
    arrivalLon = models.IntegerField()
    arrivalLat = models.IntegerField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.traveler}: {self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'


class CycleRoute(models.Model):
    traveler = models.ForeignKey(User, related_name='CycleRoute', on_delete=models.CASCADE, default=1)
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.ForeignKey(TravelBy, max_length=20, related_name='CycleRoute', on_delete=models.DO_NOTHING, default=1)
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.FloatField()
    direction = models.TextField()
    departLon = models.IntegerField()
    departLat = models.IntegerField()
    arrivalLon = models.IntegerField()
    arrivalLat = models.IntegerField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.traveler}: {self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'