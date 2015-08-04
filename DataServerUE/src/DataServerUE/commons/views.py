#coding=utf-8

from django.http import HttpResponse
from django.utils import simplejson
import logging
import os
import random
import time

def setting(request):
    return HttpResponse(open(os.path.join(os.path.dirname(__file__), 'setting.json')).read(), mimetype='application/json')

