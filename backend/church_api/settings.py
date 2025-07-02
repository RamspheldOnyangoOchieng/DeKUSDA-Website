# settings.py

from pathlib import Path
import os
from dotenv import load_dotenv
from decouple import config
from mongoengine import connect

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Secret & Debug
SECRET_KEY = config("SECRET_KEY", default="unsafe-key")
DEBUG = config("DEBUG", default="True") == 'True'
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="*").split(',')

# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',  # Your app
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'church_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'church_api.wsgi.application'

# -------------------------------
# ✅ MONGOENGINE CONNECTION HERE
# -------------------------------
connect(
    db=config("DB_NAME"),
    host=config("DB_URI"),
    alias="default"
)

# -------------------------------
# OTHER SETTINGS
# -------------------------------
CORS_ALLOW_ALL_ORIGINS = True

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
