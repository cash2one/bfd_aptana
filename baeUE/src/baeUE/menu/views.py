#coding=utf-8

from django.http import HttpResponse
from django.utils import simplejson
import logging

logger = logging.getLogger(__name__)

def get_menu(request):
    result=[{'title':'全部来源','checked':True},{'title':'直接访问','url':'http://www.sina.com.cn'},{'title':'搜索引擎','url':'http://www.google.com'}]
    json = simplejson.dumps(result)
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')

def get_menuItem(request):
    result=[{'title':'唯一访客数 ' ,'value':'123213' , 'checked':True,'key':'uv'},{'title':'页面浏览量 '  ,'value':'123213' ,'key':'pv'}]
    json = simplejson.dumps(result)
    logger.info(json)
    return HttpResponse(json, mimetype='application/json')
