from django.db import models

# Create your models here.

class TubeRoute(models.Model):
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20)
    departTime = models.DateTimeField()
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField(max_length=500)
    departLon = models.FloatField()
    departLat = models.FloatField()
    arrivalLon = models.FloatField()
    arrivalLat = models.FloatField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'


class BusRoute(models.Model):
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20)
    departTime = models.DateTimeField()
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField(max_length=500)
    departLon = models.IntegerField()
    departLat = models.IntegerField()
    arrivalLon = models.IntegerField()
    arrivalLat = models.IntegerField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'

class DriveRoute(models.Model):
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20)
    departTime = models.DateTimeField()
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField(max_length=500)
    departLon = models.IntegerField()
    departLat = models.IntegerField()
    arrivalLon = models.IntegerField()
    arrivalLat = models.IntegerField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'

class CycleRoute(models.Model):
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20)
    departTime = models.DateTimeField()
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField(max_length=500)
    departLon = models.IntegerField()
    departLat = models.IntegerField()
    arrivalLon = models.IntegerField()
    arrivalLat = models.IntegerField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'