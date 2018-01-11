"""
Django settings for doorsale_site project.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MAIN_PROJECT = os.path.dirname(__file__)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ')w&fbvx2+1$!7ac*1tr&3@o@8#edobtvh!jfizb=bs!0yd!xg3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'geo',
    'pages',
    'accounts',
    'catalog',
    'sales',
    'financial',
    'payments',
    'pipeline',
    'sorl.thumbnail',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'doorsale_site.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR + '/doorsale_site/templates',
            ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.media',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'doorsale_site.wsgi.application'

AUTH_USER_MODEL = 'accounts.User'
LOGIN_URL = '/accounts/login/'
LOGIN_REDIRECT_URL = '/'

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases


DATABASES_DEFAULT_PORT = '5432'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'doorsale',
        'USER': 'doorsale',
        'PASSWORD': '*2?m@QL6ytjMC3*JX2P?E3yx@G!6EqwG',
        'HOST': 'localhost',
        'PORT': DATABASES_DEFAULT_PORT,
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

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

# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'
# STATIC_URL = 'https://smestanza.me/static_doorsale/doorsale/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Raise thumbnail errors and send it via emails
THUMBNAIL_DEBUG = True

# LESS & Javascript static files serving in development
STATICFILES_STORAGE = 'pipeline.storage.PipelineStorage'

# Pipeline finders for serving pipeline static files
from django.conf.global_settings import STATICFILES_FINDERS
STATICFILES_FINDERS += (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'pipeline.finders.PipelineFinder',
)

# LESS compiler search paths for resources
# Always use relative paths in @import statements in LESS
# All resources in app's static directory will be available
# for LESS compiler
from utils.finders import get_static_paths
PIPELINE_LESS_ARGUMENTS = '--include-path="%s"' % STATIC_ROOT

PIPELINE = {
    'COMPILERS': (
        'pipeline.compilers.less.LessCompiler',
        ),
    'LESS_ARGUMENTS': '--include-path="%s"' % STATIC_ROOT,

    # CSS configurations for django-pipeline
    # All LESS styles configured for doorsale defined
    # You can append your LESS configurations here.
    'STYLESHEETS': {
        # doorsale app LESS styles
        'base': {
            'source_filenames': (
                'doorsale/css/base.less',
            ),
            'output_filename': 'doorsale/css/base.css',
        },
        # doorsale.catalog LESS styles for products catalog
        'catalog': {
            'source_filenames': (
                'catalog/css/catalog.less',
                'doorsale/css/bootstrap.min.css',

            ),
            'output_filename': 'catalog/css/catalog.css'
        },
        # Font-Awesome icons serve mostly
        'font-awesome': {
            'source_filenames': (
                'catalog/css/font-awesome/css/font-awesome.min.css',
            ),
            'output_filename': 'catalog/css/font-awesome/css/font-awesome.min.css'
        },
        # doorsale.sales LESS styles for checkout pages
        'sales': {
            'source_filenames': (
                'sales/css/sales.less',
            ),
            'output_filename': 'sales/css/sales.css'
        },
        # doorsale.pages LESS styles for flat pages
        'pages': {
            'source_filenames': (
                'pages/css/pages.less',
            ),
            'output_filename': 'pages/css/pages.css'
        }
    },

    'DISABLE_WRAPPER': True,
    # Javascript configuration for django-pipeline
    # Doorsale app's Javascript compressed & versioned before deployment
    # Simply add your project or apps Javascript here
    'JAVASCRIPT': {
        # doorsale: Base javascript include in every page
        'base': {
            'source_filenames': (
                'doorsale/scripts/jquery-ajax.js',
               # 'doorsale/scripts/jquery-utils.js',
                'doorsale/scripts/popper.js',
                'doorsale/scripts/bootstrap.js',
            ),
            'output_filename': 'doorsale/scripts/base.js',
        },
        # doorsale.catalog: Javascript for product catalog pages
        'catalog_base': {
            'source_filenames': (
                'catalog/scripts/jquery.catalog_base.js',
            ),
            'output_filename': 'catalog/scripts/catalog_base.js',
        },
        'search_products': {
            'source_filenames': (
                'catalog/scripts/jquery.search_products.js',
            ),
            'output_filename': 'catalog/scripts/search_products.js',
        },
        'product_detail': {
            'source_filenames': (
                'catalog/scripts/jquery.scrollTo.js',
                'catalog/scripts/jquery.serialScroll.js',
                'catalog/scripts/jquery.elevatezoom.js',
                'catalog/scripts/jquery.product_detail.js',
            ),
            'output_filename': 'catalog/scripts/product_detail.js',
        },
        'sales_checkout_order': {
            'source_filenames': (
                'sales/scripts/jquery.creditCardValidator.js',
                'sales/scripts/jquery.maskedinput.js',
                'sales/scripts/jquery.checkout_order.js',
            ),
            'output_filename': 'sales/scripts/sales_checkout_order.js',
        }
    }
}

# Views to render page from doorsale.pages
PAGE_VIEWS = (('pages_base_page', 'Base View'),
              ('pages_catalog_page', 'Catalog View')
)


# Email with GMAIL
DEFAULT_FROM_EMAIL = 'prueba.sm.email@gmail.com'

EMAIL_USE_TLS = True

EMAIL_HOST = 'smtp.gmail.com'

EMAIL_HOST_USER = 'prueba.sm.email@gmail.com'

EMAIL_HOST_PASSWORD = 'j&kL3Qd39_ac*72q'

EMAIL_PORT = 587

