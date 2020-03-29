from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TubeListView, TubeSingleView, TravelerView

urlpatterns = [
    path('tubes/', TubeListView.as_view()),
    path('tubes/<int:pk>/', TubeSingleView.as_view()),
    path('traveler/', TravelerView.as_view())
]

# Using format suffixes gives us URLs that explicitly refer to a given format, 
# and means our API will be able to handle URLs
urlpatterns = format_suffix_patterns(urlpatterns)

