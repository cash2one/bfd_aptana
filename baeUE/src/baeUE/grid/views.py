#coding=utf-8

from django.http import HttpResponse
from django.utils import simplejson
import logging
import time

logger = logging.getLogger(__name__)

def grid_filter_toggle(request):
#    time.sleep(5)
    result=[]
    for i in range(10):
        result.append({'UV':'60','source' :'http://www.sina.com.cn','name':'bill','sex':'test','test1':i+1})
    json = simplejson.dumps({'stores':result,'totalItem':500,'countCol':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')

def grid_index(request):
    result=[]
    result.append({'source' :'http://www.sina.com.cn','name':'bill','sex':'test'})
#    result.append({'source' :'http://www.douban.com','name':{'content':'im','attr':{'rowspan':5,'colspan':2}},'sex':'111111','test1':'w'})
    for i in range(4):
        result.append({'source' :'http://www.sina.com.cn','name':'bill','sex':'test','test1':i+1})
    result.append({'source' :'http://www.google.com.cn','name':'alex','sex':'m'})
    result.append({'sex':'test'})
#    for i in range(17):
#        result.append({'source' :'http://www.sina.com.cn','name':'bill','sex':'test'})
    result.append({'source' :'http://www.sina.com.cn','name':'bill','sex':'test'})
    json = simplejson.dumps({'stores':result,'totalItem':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')

def get_group_message(request):
    result=[]
    result.append({'source' :'http://www.sina.com.cn','name':'bill','sex':'test'})
    result.append({'source' :'http://www.apache.com.cn','name':'bill','sex':'test'})
    json = simplejson.dumps({'stores':result,'totalItem':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')

def get_compare_group(request):
    result=[]
    result.append({
           'source':'http://www.sina.com.cn',
           'date1':{'pv':20,'uv':21,'vistor':12},
            'date2':{'pv':20,'uv':21,'vistor':12}
       })
    result.append({
           'source':'http://www.weibo.com',
           'date1':{'pv':20,'uv':21,'vistor':12},
            'date2':{'pv':20,'uv':21,'vistor':12}
       })
    result.append({
           'source':'http://www.google.com',
           'date1':{'pv':20,'uv':21,'vistor':12},
            'date2':{'pv':20,'uv':21,'vistor':12}
       })
    json = simplejson.dumps({'stores':result,'totalItem':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')

def get_tree_deep_main(request):
    result=[]
    result.append({'source' :{'content':'http://www.sina.com.cn','attr':{'colspan':'all'}}})
    result.append({'source' :{'content':'http://www.weibo.com','attr':{'colspan':'all'}}})
    result.append({'source' :{'content':'http://www.google.com','attr':{'colspan':'all'}}})
    json = simplejson.dumps({'stores':result,'totalItem':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')


def get_tree_deep_item(request):
    result=[]
    result.append({ 'pv':20,'uv':21,'vistor':12})
    result.append({ 'pv':20,'uv':21,'vistor':12})
    result.append({ 'pv':20,'uv':21,'vistor':12})
    json = simplejson.dumps({'stores':result,'totalItem':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')

def get_pie_grid(request):
    result=[]
    piedata= []
    piedata.append({
            "value": "25",
            "label": "google"
        })
    piedata.append(  {
            "value": "35",
            "label": "baidu",
        })
    piedata.append(   {
            "value": "40",
            "label": "weibo",
        })
    result.append({'source':'http://www.google.com','pv':20,'uv':21,'vistor':12,'pie':{'type':'pieType','data':piedata}})
    result.append({'source':'http://www.baidu.com','pv':20,'uv':21,'vistor':12})
    result.append({'source':'http://www.weibo.com','pv':20,'uv':21,'vistor':12})
    json = simplejson.dumps({'stores':result,'totalItem':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')


def get_group(request):
    result=[]
    result.append({
           'source':'http://www.sina.com.cn',
           'group':[{ 'dateRange':'2012' , 'pv':20,'uv':21,'vistor':12},{'dateRange':'2011' ,'pv':50,'uv':21,'vistor':12}]
       })
    result.append({
           'source':'http://www.weibo.com',
           'group':[{'pv':20,'uv':21,'vistor':12},{'pv':20,'uv':21,'vistor':12}]
       })
    result.append({
           'source':'http://www.google.com',
           'group':[{'pv':20,'uv':21,'vistor':12},{'pv':20,'uv':21,'vistor':12}]
       })
    json = simplejson.dumps({'stores':result,'totalItem':500})
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')