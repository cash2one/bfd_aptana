#coding=utf-8

from django.http import HttpResponse
from django.utils import simplejson
import logging
import random
import time

logger = logging.getLogger(__name__)

def index(request):
      result={}
      result['type']=[12,20,25,30,40]
      if request.GET.has_key('dbTypeName'):
          result['dbtype']=[12,20,50,60,80]
      if request.GET.has_key('dbBegin'):
          result['type2']=[23,34,45,45,56]
      if request.GET.has_key('dbTypeName') and  request.GET.has_key('dbBegin'):
          result['dbtype2']=[12,22,56,57,58]   
      json = simplejson.dumps(result)
      logger.info(json)
      return HttpResponse(json, mimetype='application/json')

def map(request):
      r=['heilongjiang','jilin','xinjiang','liaoning','beijing','neimenggu','gansu','tianjin','hebei','shanxi','ningxia','shandong','qinghai','shaanxi','jiangsu','henan','xizang','anhui','sichuan','hubei','chongqing','zhejiang','jiangxi','hunan','guizhou','fujian','yunnan','guangdong','guangxi','taiwan','xianggang','aomen','hainan','shanghai']
      result=dict([(i,random.randint(0,99)) for i in r])
      json = simplejson.dumps(result)
      logger.info(json)
      return HttpResponse(json, mimetype='application/json')
