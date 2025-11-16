from pathlib import Path
import os
from dotenv import load_dotenv

# *** Core ***

# Base Directory name should be resolved. Load environment variables from .env in os environ namespace
BASE_DIR = Path(__file__).resolve().parent.parent
MAIN_APP_DIR = Path(__file__).resolve().parent

load_dotenv(os.path.join(BASE_DIR, '.env'))

# Load in SECRET_KEY via .env
SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = os.environ.get('DEBUG', "True").lower() == "true"

# Root URL builder
ROOT_URLCONF = f'{MAIN_APP_DIR.name}.{os.environ.get("ROOT_URLCONF", 'urls')}'

# *** Application Definitions ***

INSTALLED_APPS = [

    # Core Django Apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Libraries
    'rest_framework',
    'corsheaders',
    'django_filters',

    # Auth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    # Apps
    'directory.apps.DirectoryConfig',
    'workspace.apps.WorkspaceConfig',
    'profile.apps.ProfileConfig',
    'messaging.apps.MessagingConfig',
]

# Specifies IP Ranges allowed in connection requests
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

# *** Database ***

# Boolean check for PostgreSQL or SQLite configuration
USE_POSTGRES = os.environ.get('USE_POSTGRES', "False").lower() == "true"
if USE_POSTGRES:
    print("Connecting to PostgreSQL database...")
    DATABASES = {
        'default': {
            'ENGINE': os.environ.get('DB_ENGINE'),
            'NAME': os.environ.get('DB_NAME'),
            'PASSWORD': os.environ.get('DB_PASSWORD'),
            'HOST': os.environ.get('DB_HOST'),
            'PORT': os.environ.get('DB_PORT'),
        }
    }
else:
    print("Connecting to localised SQLITE3 testing ground...")
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3'
        }
    }

# Defines auto incrementation method of default PK's
DEFAULT_AUTO_FIELD = os.environ.get("DEFAULT_AUTO_FIELD", 'django.db.models.BigAutoField')

# ** Templating **

# May not need these outside of debugging. React led templating
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Defines root static directory path for images / JS / CSS etc.
STATIC_URL = os.environ.get("STATIC_URL", "static/")

# *** Services ***

# Pointer to main WSGI server service run on runserver
WSGI_APPLICATION = f'{MAIN_APP_DIR.name}.wsgi.application'

# Using basic Django included password authentication services for now. May experiment with a Passkey service if I get time
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Middleware connection protection between frontend and backend
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

# Authentiation Backend Services
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthencationBackend'
]

# SOCIALACCOUNT_PROVIDERS = {
#     "APP": {
#         'client_id': '123',
#         'secret': '456',
#         'key': ''
#     }
# }

# Needed for AllAuth (To Handle Multiple Websites)
SITE_ID = int(os.environ.get('SITE_ID', "1"))

# *** Internationalisation ***
LANGUAGE_CODE = os.environ.get("LANGUAGE_CODE", 'en-us')
TIME_ZONE = os.environ.get("TIME_ZONE", 'UTC')
USE_I18N = os.environ.get("USE_I18N", "True").lower() == "true"
USE_TZ = os.environ.get("USE_TZ", "True").lower() == "true"
