from django.contrib import admin
from .models import PublicRoute, DriveRoute, CycleRoute, TravelBy


# Register your models here.

admin.site.register(TravelBy)
admin.site.register(PublicRoute)
admin.site.register(DriveRoute)
admin.site.register(CycleRoute)
