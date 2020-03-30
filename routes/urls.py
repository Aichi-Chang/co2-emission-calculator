from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from routes import views
from .views import TubeListView, TubeSingleView, BusListView, BusSingleView, DriveListView, DriveSingleView, CycleListView, CycleSingleView, TravelerSingleView


urlpatterns = [
    path('tube/', TubeListView.as_view()),
    path('tube/<int:pk>/', TubeSingleView.as_view()),

    path('bus/', BusListView.as_view()),
    path('bus/<int:pk>/', BusSingleView.as_view()),

    path('drive/', DriveListView.as_view()),
    path('drive/<int:pk>/', DriveSingleView.as_view()),

    path('cycle/', CycleListView.as_view()),
    path('cycle/<int:pk>/', CycleSingleView.as_view()),

    path('traveler/<int:pk>/', TravelerSingleView.as_view())
]

# Using format suffixes gives us URLs that explicitly refer to a given format, 
# and means our API will be able to handle URLs
urlpatterns = format_suffix_patterns(urlpatterns)

