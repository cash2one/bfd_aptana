#coding=utf-8
import os

if __name__ == '__main__':
    for file in os.listdir(os.getcwd()):
         if file.endswith('html') or file.endswith('jsp'):
             content= open(file, 'r').read()
             content=content.replace("""foot.html""",
                                                    """foot.jsp""")
             open(file, 'w').write(content)
             
 