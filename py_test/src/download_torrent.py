#coding=utf-8

import urllib2
import urllib
import re
import time
import threading
import socket
import os
 
socket.setdefaulttimeout(120)  

list_pattern=re.compile(r'<a href="show.php\?hash=(\w+)" target="_blank">(.*?)</a>', re.S)
page_pattern=re.compile('<a href="(.*?)">普通下载</a>', re.U)   
error_file_list=[]
filelist=[]
class Conn(object):  
    def __init__(self):  
            self.headers = {  
                                        'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'  
                                    }       
    def request(self, url, data={},times=0):  
           try:
                   postdata = urllib.urlencode(data)        
                   req = urllib2.Request(
                                                       url=url,
                                                       data=postdata,
                                                       headers=self.headers  
                                                       )  
                   link = urllib2.urlopen(req)  
                   result = link.read()  
                   link.close()  
                   return  result  
           except  Exception, e:         #处理超时、url不正确异常
                 if times <20:
                          print "conn error:%s"%e
                          print r'重新连接'
                          self.request(url, data,times+1)
                 else:
                          print '重试超过20次,退出'
                          error_file_list.append(url)

def download_torrent(url,name,times=0):
      try:
          urllib.urlretrieve(url,name)
      except  Exception, e:         #处理超时、url不正确异常
          print "download error:%s"%e
          if times <20:
              print r'重新下载'
              download_torrent(url,name,times+1)
          else:
              print '重试超过20次,退出'
              error_file_list.append(url)
         
def  into_list_page(url,i):
          c=Conn()
          print r'进入第%s页'%i
          list_page=c.request(url)
          print r'第%s页载入完毕'%i
          l=re.findall(list_pattern,list_page)
          print r'第%s页分析完毕,共%s个下载,下载开始'%(i,len(l))
          for i in l:
                print r'开始载入%s'%(r'http://bestxl.com/show.php?hash=%s'%i[0])
                page=c.request(r'http://bestxl.com/show.php?hash=%s'%i[0])
                print r'载入完毕%s'%(r'http://bestxl.com/show.php?hash=%s'%i[0])
                m=re.search(page_pattern, page)
                downurl=r'http://bestxl.com/%s'%m.group(1).replace(r'amp;','')
                print r'分析完毕%s'%(r'http://bestxl.com/show.php?hash=%s'%i[0])
                name=i[1].strip().replace(r'<span style="color:red;font-weight:bold;">','').replace(r'<span style="color:green;font-weight:bold;">',r'').replace(r'<span style="color:blue;font-weight:bold;">',r'').replace(r'</span>','').replace(r'/',r'  ').replace(r'\\',r'  ')
                pos=1
                while name in filelist:
                         name="%s%s"%(name,pos)
                         pos+=1
                filelist.append(name)
                name=r'%s.%s'%(name,'torrent')      
                print r'开始下载%s'%name   
                download_torrent(downurl,os.path.join(r'E:\bt',name.decode('UTF-8')))
                print r'下载%s完毕'%name   
if __name__ == '__main__':  
        start=time.time()
        threads=[]
        for  i in range(1,40):
                threads.append(threading.Thread(target=into_list_page,args=(r'http://bestxl.com/index.php?sort_id=36&page=%s'%i,i)))
        for i in threads:
              i.start()
        while reduce(lambda x,y:x or y,[ i.isAlive() for i in threads]):
                time.sleep(1)
                print time.time()
        end=time.time()
        print end,start,end-start
        print r'全部下载完毕,共用时%s'%(end-start)
        print  r'以下文件未能成功下载:'
        for i in error_file_list:
            print i
    
