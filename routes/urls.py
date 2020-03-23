from django.urls import path
from .views import TubeListView, TubeSingleView

urlpatterns = [
    path('tubes/', TubeListView.as_view()),
    path('tubes/<int:pk>/', TubeSingleView.as_view())
]