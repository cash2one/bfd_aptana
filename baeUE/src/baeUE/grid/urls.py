#coding=utf-8
from baeUE.grid.views import grid_index, get_group_message, get_compare_group, \
    get_tree_deep_main, get_tree_deep_item, get_pie_grid, grid_filter_toggle, \
    get_group
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('',
    url(r'^$',  grid_index),
    url(r'^groupitem/$',  get_group_message),
    url(r'^groupcompare/$',  get_compare_group),
    url(r'^tree_deep_main/$',  get_tree_deep_main),
    url(r'^tree_deep_item/$',  get_tree_deep_item),
     url(r'^pie_grid/$',  get_pie_grid),
     url(r'^grid_filter_toggle/$',  grid_filter_toggle),
     url(r'^group/$',  get_group),
    )



if __name__ == '__main__':
    pass