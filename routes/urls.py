from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TubeListView, TubeSingleView, BusListView, BusSingleView, TravelerSingleView

urlpatterns = [
    path('tubes/', TubeListView.as_view()),
    path('tubes/<int:pk>/', TubeSingleView.as_view()),
    path('bus/', BusListView.as_view()),
    path('bus/<int:pk>/', BusSingleView.as_view()),
    path('traveler/<int:pk>/', TravelerSingleView.as_view())
]

# Using format suffixes gives us URLs that explicitly refer to a given format, 
# and means our API will be able to handle URLs
urlpatterns = format_suffix_patterns(urlpatterns)

