#coding=utf-8
import os
from string import Template


if __name__ == '__main__':
#    print __file__
#    cwd=os.getcwd()
    template = Template(open('Template.html').read())
    for file in os.listdir(os.getcwd()):
          if file.endswith('html') and file != 'Template.html' and file != 'synthetical.html':
              open(file, 'w').write(template.substitute(name=file.replace('.html', '.js')))
              
              
              
