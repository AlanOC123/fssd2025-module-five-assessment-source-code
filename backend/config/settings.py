"""
Django settings for the Project Management API.

This configuration file manages the core architecture of the backend, focusing on:
1. Security: JWT-based authentication via HTTPOnly cookies.
2. API Access: CORS and CSRF settings for React/Next.js frontend integration.
3. Database: Toggleable PostgreSQL connection (Local vs. Docker).
4. Email: SMTP configuration for real-world password resets.
"""

from pathlib import Path
from decouple import config
from datetime import timedelta
import os
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - suitability for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', True, cast=bool)

# Hosts configuration
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip('') for s in v.split(',') ])


# --- 1. Application Definition ---
# Split into Core (Framework), Third-party (Libs), and Local (Your Code) for clarity.

INSTALLED_APPS = [
    # Core Django Apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # Third-Party Libraries
    'rest_framework',            # The API Toolkit
    'rest_framework_simplejwt',  # JSON Web Token support
    'rest_framework.authtoken',  # Token Auth (legacy support)
    'corsheaders',               # Handles Cross-Origin Resource Sharing
    'dj_rest_auth',              # Auth endpoints (Login, Logout, PW Reset)
    'dj_rest_auth.registration', # Registration endpoints
    'allauth',                   # Identity infrastructure
    'allauth.account',           # Account management
    'allauth.socialaccount',     # Social Auth (future proofing)

    # Local Apps (The custom business logic)
    'apps.users',
    'apps.projects',
    'apps.tasks',
    'apps.notifications',
    'apps.chat',
]

SITE_ID = 1 # Required for django.contrib.sites

MIDDLEWARE = [
    # CORS must come before CommonMiddleware to handle preflight requests correctly
    'corsheaders.middleware.CorsMiddleware',
    
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    # Required for allauth to function
    'allauth.account.middleware.AccountMiddleware'
]

ROOT_URLCONF = 'config.urls'

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

WSGI_APPLICATION = 'config.wsgi.application'


# --- 2. Database Configuration ---
# Uses 'python-decouple' to switch databases based on environment variables.

USE_POSTGRES = config('USE_POSTGRES', default=True, cast=bool)

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(DATABASE_URL, conn_max_age=600, ssl_require=True)
    }
elif USE_POSTGRES:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST': config('DB_HOST', default='127.0.0.1'),
            'PORT': config('DB_PORT', default='5432')  
        }
    }
else:
    # Fallback to SQLite for quick testing if needed
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# --- 3. Authentication & Authorization ---
# Configuring DRF to use JWT Cookies by default.

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]


# --- 4. CORS & CSRF (Frontend Integration) ---
# Critical for allowing the React frontend
# to communicate with this backend safely.

CSRF_COOKIE_HTTPONLY = False  # Allows frontend to read the CSRF token if necessary
CORS_ALLOW_CREDENTIALS = config('CORS_ALLOW_CREDENTIALS', cast=bool)

# Origins that are trusted to make requests
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', ["http://localhost:5173"], cast=lambda v: [s.strip('') for s in v.split(',')])
CSRF_TRUSTED_ORIGINS = config('CSRF_TRUSTED_ORIGINS', ["http://localhost:5173"], cast=lambda v: [s.strip('') for s in v.split(',')])


# --- 5. JWT Configuration (SimpleJWT) ---

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60), # Short-lived access token
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),    # Long-lived refresh token
    'ROTATE_REFRESH_TOKENS': True,                  # Security: New refresh token on every use
    'AUTH_HEADER_TYPES': ('Bearer',),
}


# --- 6. dj-rest-auth Configuration ---
# This controls how the authentication endpoints behave.

ACCOUNT_LOGIN_METHODS = {"email"} # Log in with Email, not Username
ACCOUNT_EMAIL_VERIFICATION = 'none' # Simplified for this MVP
ACCOUNT_USER_MODEL_USERNAME_FIELD = 'username'
AUTH_USER_MODEL = 'auth.User' # Standard User Model

# Frontend URL to redirect users to after clicking the "Reset Password" email link
PASSWORD_RESET_REDIRECT_LINK = "http://localhost:5173/auth"

REST_AUTH = {
    # Custom Serializers (Injecting our custom logic)
    'LOGIN_SERIALIZER': 'dj_rest_auth.serializers.LoginSerializer',
    'REGISTER_SERIALIZER': 'apps.users.serializers.CustomRegisterSerializer', # <-- Our custom Registration
    'USER_DETAILS_SERIALIZER': 'apps.users.serializers.UserSerializer',

    # Configuration Flags
    'USE_JWT': True,
    'SESSION_LOGIN': False, # We are using Stateless JWT, not Sessions
    'OLD_PASSWORD_FIELD_ENABLED': True,
    'LOGOUT_ON_PASSWORD_CHANGE': False,

    # Cookie Configuration (The "Secure" part of the auth)
    'JWT_AUTH_COOKIE': 'auth-token',          # Name of the access cookie
    'JWT_AUTH_REFRESH_COOKIE': 'refresh-token', # Name of the refresh cookie
    'JWT_AUTH_REFRESH_COOKIE_PATH': '/',
    
    # Security Settings (Toggled based on environment below)
    'JWT_AUTH_SECURE': False, # False for Dev (HTTP), True for Prod (HTTPS)
    'JWT_AUTH_HTTPONLY': True, # JS cannot read this (XSS Protection)
    'JWT_AUTH_SAMESITE': 'Lax',
}


# --- 7. Production Security Overrides ---
# If DEBUG is False (Production), enforce HTTPS and Secure Cookies.

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE = True
    REST_AUTH["JWT_AUTH_SECURE"] = True


# --- 8. Email Configuration ---
# Uses Gmail SMTP for sending password reset emails.

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")


# --- 9. Internationalization & Static Files ---

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
