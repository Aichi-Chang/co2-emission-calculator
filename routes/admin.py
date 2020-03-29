from django.contrib import admin
from .models import TubeRoute, BusRoute, DriveRoute, CycleRoute, TravelBy


# Register your models here.

admin.site.register(TravelBy)
admin.site.register(TubeRoute)
admin.site.register(BusRoute)
admin.site.register(DriveRoute)
admin.site.register(CycleRoute)
