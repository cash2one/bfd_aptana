#coding=utf-8
from baeUE.menu.views import  get_menu,get_menuItem
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('',
#    url(r'^$',  grid_index),
    url(r'^menu/$',  get_menu),
    url(r'^menuItem/$',  get_menuItem),
    )



if __name__ == '__main__':
    pass