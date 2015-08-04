#coding=utf-8

import os,re

old=r'<a\s+href="#">\n\s+<div\s+class="logo">\n\s+<strong>media</strong>\n\s+</div>\n\s+</a>'            
#old="""<a href="#">\n                <div class="logo">\n                    <strong>media</strong>\n                </div>\n            </a>"""
new="""<a href="../../DataAnalysis/stat/!synthetical.action">
                <div class="logo">
                    <strong>media</strong>
                </div>
            </a>"""        
#content="""    </div>
#            <a href="#">
#                <div class="logo">
#                    <strong>media</strong>
#                </div>
#            </a>
#            <ul class="nav" id="nav">"""
if __name__ == '__main__':
    for root, dirs, files in os.walk(os.getcwd()):  
          for name in files:
                file = os.path.join(root, name)
                if  file.endswith('jsp'):
                     content= open(file).read()
                     m = re.search(old, content,re.M)  
                     if m:  
                         print file
                         content=content.replace(old,new)
                         open(file, 'w').write(content)
             
 