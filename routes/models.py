from django.db import models

# Create your models here.

class TubeRoute(models.Model):
    depart = models.CharField(max_length=50)
    arrive = models.CharField(max_length=50)
    travelBy = models.CharField(max_length=20, default='Tube')
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField()
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
    travelBy = models.CharField(max_length=20, default='Bus')
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField()
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
    travelBy = models.CharField(max_length=20, default='Drive')
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField()
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
    travelBy = models.CharField(max_length=20, default='Cycle')
    departTime = models.DateTimeField(auto_now_add=True)
    arriveTime = models.DateTimeField()
    duation = models.IntegerField()
    direction = models.TextField()
    departLon = models.IntegerField()
    departLat = models.IntegerField()
    arrivalLon = models.IntegerField()
    arrivalLat = models.IntegerField()
    carbonPrint = models.FloatField()

    def __str__(self):
        return f'{self.travelBy} {self.depart} - {self.arrive} {self.duation} {self.direction}'