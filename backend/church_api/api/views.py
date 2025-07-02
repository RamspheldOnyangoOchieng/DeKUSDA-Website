from django.shortcuts import render
# api/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from .mongo_models import Book
import datetime
from .mongo_models import Sermon

def sermon_list(request):
    sermons = Sermon.objects.order_by('-date')
    data = [{"title": s.title, "preacher": s.preacher, "video": s.video_url, "date": s.date} for s in sermons]
    return JsonResponse(data, safe=False)




@csrf_exempt
def upload_book(request):
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_url = fs.url(filename)

        new_book = Book(
            title=request.POST.get('title'),
            author=request.POST.get('author'),
            file_url=file_url,
            uploaded_at=datetime.datetime.utcnow()
        )
        new_book.save()

        return JsonResponse({'message': 'Book uploaded successfully', 'file_url': file_url})

    return JsonResponse({'message': 'No file uploaded'}, status=400)
