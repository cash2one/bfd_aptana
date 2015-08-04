from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^commons/',include('DataServerUE.commons.urls')),
    url(r'^chart/',include('DataServerUE.chart.urls'))
    # Examples:
    # url(r'^$', 'DataServerUE.views.home', name='home'),
    # url(r'^DataServerUE/', include('DataServerUE.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
