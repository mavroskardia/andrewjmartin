from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ajm.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'landing.views.index', name='home'),
    url(r'^admin/', include(admin.site.urls)),
)

#if settings.DEBUG:
#	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
