#coding=utf-8

import os,os.path,re,time  
  
filelist=[]  
path = 'E:\\aptana_work\\baeUE'  
  
t=time.strptime("2010-04-05 00:00:00", "%Y-%m-%d %H:%M:%S")  
t= time.mktime(t)  
  
  
  
for root, dirs, files in os.walk(path):  
    for file in files:  
        path= os.path.join(root, file)  
        if (not re.match(r".*(\.svn|\.project|html\.\d+|Thumbs\.db).*", path)):# and os.path.getmtime(file)>t :  
            filelist.append(path)  
  
for i in filelist:  
  if os.path.getmtime(i)>t:  
      print i#,time.strftime('%Y-%m-%d %H:%M:%S',time.gmtime(os.path.getmtime(i)))