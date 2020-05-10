from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.

class TravelBy(models.Model):
    type = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.type}'




class PublicRoute(models.Model):
    traveler = models.ForeignKey(User, related_name='publicRoutes', on_delete=models.CASCADE)
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20)
    departTime = models.CharField(max_length=50)
    arriveTime = models.CharField(max_length=50)
    duation = models.CharField(max_length=50)
    direction = models.TextField()
    instruction = models.TextField()
    departLon = models.FloatField()
    departLat = models.FloatField()
    arrivalLon = models.FloatField()
    arrivalLat = models.FloatField()
    maneuverLon = ArrayField(models.FloatField())
    maneuverLat = ArrayField(models.FloatField())
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.traveler}: {self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'


class DriveRoute(models.Model):
    traveler = models.ForeignKey(User, related_name='driveRoutes', on_delete=models.CASCADE, default=1)
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20)
    departTime = models.CharField(max_length=50)
    arriveTime = models.CharField(max_length=50)
    duation = models.CharField(max_length=50)
    direction = models.TextField()
    instruction = models.TextField()
    departLon = models.FloatField()
    departLat = models.FloatField()
    arrivalLon = models.FloatField()
    arrivalLat = models.FloatField()
    maneuverLon = ArrayField(models.FloatField())
    maneuverLat = ArrayField(models.FloatField())
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.traveler}: {self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'


class CycleRoute(models.Model):
    traveler = models.ForeignKey(User, related_name='cycleRoutes', on_delete=models.CASCADE, default=1)
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20)
    departTime = models.CharField(max_length=50)
    arriveTime = models.CharField(max_length=50)
    duation = models.CharField(max_length=50)
    direction = models.TextField()
    instruction = models.TextField()
    departLon = models.FloatField()
    departLat = models.FloatField()
    arrivalLon = models.FloatField()
    arrivalLat = models.FloatField()
    maneuverLon = ArrayField(models.FloatField())
    maneuverLat = ArrayField(models.FloatField())
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.traveler}: {self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'