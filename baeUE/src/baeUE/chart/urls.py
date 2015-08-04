#coding=utf-8
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('baeUE.chart.views',
    url(r'^$',  'index'),
     url(r'map/$',  'map'),
    )



if __name__ == '__main__':
    pass