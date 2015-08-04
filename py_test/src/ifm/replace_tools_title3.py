#coding=utf-8
import os

old0='images/tuidouer.ico'
new0="""<link rel="shortcut icon" href="../../images/tuidouer.ico" >
             </head>"""


if __name__ == '__main__':
    for root, dirs, files in os.walk(os.getcwd()):  
          for name in files:
                file = os.path.join(root, name)
                if  file.endswith('jsp'):
                     print file
                     content= open(file, 'r').read()
                     content=content.replace(old0,new0)
                     open(file, 'w').write(content)
             
 