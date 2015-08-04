#coding=utf-8
import os
import shutil

for root,dirs,file in os.walk("E:\\bae\\bae\\trunk\\src\\main\\webapp\\resources"):  
    if(root[-4:]==".svn"):  
        print root  
        os.system('attrib -r '+root+"\\*.* /s")  
        shutil.rmtree(root)  