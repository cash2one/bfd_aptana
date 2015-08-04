#coding=utf-8
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('DataServerUE.chart.views',
    url(r'test/(?P<id>\w{0,50})$',  'test')
    )



if __name__ == '__main__':
    pass