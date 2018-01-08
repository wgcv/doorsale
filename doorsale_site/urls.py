from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns 

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    # Doorsale urls containing urls for all apps
    url(r'^', include('catalog.urls')),
    url(r'^accounts/', include('accounts.urls')),
    url(r'^sales/', include('sales.urls')),
    url(r'^payments/', include('payments.urls')),
    url(r'^pages/', include('pages.urls'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# In Debug mode we need to serve media files
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
