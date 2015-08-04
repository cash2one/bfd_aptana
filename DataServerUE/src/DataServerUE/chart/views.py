#coding=utf-8

from django.http import HttpResponse
from django.utils import simplejson
import logging
import os
import random
import time

logger = logging.getLogger(__name__)

def test(request,id):
    logger.info(request.GET['id'])
    if request.GET['id'] == '1':
        return HttpResponse(open(os.path.join(os.path.dirname(__file__), 'line.json')).read(), mimetype='application/json')
    elif request.GET['id'] == '2':
        return HttpResponse(open(os.path.join(os.path.dirname(__file__), 'pie.json')).read(), mimetype='application/json')
    else:
        pass
    

