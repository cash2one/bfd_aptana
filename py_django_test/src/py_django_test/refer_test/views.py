#coding=utf-8

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.template.response import TemplateResponse
from django.utils import simplejson
import logging
import os
import random
import time


def refer(request):
#        request.META.set('HTTP_REFERER','google.com')
#        request.META['HTTP_REFERER'] = 'google.com'
#        return  render_to_response('refer.html', {'foo': 'ba22r'},context_instance=RequestContext(request)) 
         response = TemplateResponse(request, 'refer.html', {})   
         response['HTTP_REFERER'] = 'google.com'
#           request.add_header('Referer', "http://v.qq.com/zt2012/cstvf2012/tvactor.htm")
         return response