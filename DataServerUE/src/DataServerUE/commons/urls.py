#coding=utf-8
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('DataServerUE.commons.views',
    url(r'setting/$',  'setting')
    )



if __name__ == '__main__':
    pass