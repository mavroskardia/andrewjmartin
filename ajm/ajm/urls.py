from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ajm.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'landing.views.index', name='home'),
    url(r'^blog/', include('blog.urls', namespace='blog', app_name='blog')),
    url(r'^resume/', include('resume.urls', namespace='resume', app_name='resume')),
    url(r'^tinkerings/', include('tinkerings.urls', namespace='tinkerings', app_name='tinkerings')),
    url(r'^admin/', include(admin.site.urls)),
)

#if settings.DEBUG:
#	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
