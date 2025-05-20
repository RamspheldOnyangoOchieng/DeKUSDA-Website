from mongoengine import Document, StringField, DateTimeField, FileField
import datetime

class Sermon(Document):
    title = StringField(required=True)
    preacher = StringField()
    video_url = StringField()
    date = DateTimeField(default=datetime.datetime.utcnow)

    meta = {'collection': 'sermons'}

class Book(Document):
    title = StringField(required=True)
    author = StringField()
    file_url = StringField()
    uploaded_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {'collection': 'books'}

class GalleryImage(Document):
    caption = StringField()
    image_url = StringField(required=True)
    uploaded_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {'collection': 'gallery_images'}