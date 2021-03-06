from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from routes import views
from .views import PublicListView, PublicSingleView, DriveListView, DriveSingleView, CycleListView, CycleSingleView, TravelerSingleView


urlpatterns = [
    path('public/', PublicListView.as_view()),
    path('public/<int:pk>/', PublicSingleView.as_view()),

    path('car/', DriveListView.as_view()),
    path('car/<int:pk>/', DriveSingleView.as_view()),

    path('bicycle/', CycleListView.as_view()),
    path('bicycle/<int:pk>/', CycleSingleView.as_view()),

    path('traveler/', TravelerSingleView.as_view())
]

# Using format suffixes gives us URLs that explicitly refer to a given format, 
# and means our API will be able to handle URLs
urlpatterns = format_suffix_patterns(urlpatterns)

