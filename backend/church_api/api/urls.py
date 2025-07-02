from django.urls import path
import django.contrib.staticfiles.urls
from .views import sermon_list, upload_book
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('sermons/', sermon_list, name='sermon-list'),
    path('upload-book/', upload_book, name='upload-book'),
]