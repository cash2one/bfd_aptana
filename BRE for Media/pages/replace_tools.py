#coding=utf-8
import os

if __name__ == '__main__':
    for root, dirs, files in os.walk(os.getcwd()):  
          for name in files:
                file = os.path.join(root, name)
                if file.endswith('html') or file.endswith('jsp'):
                     print file
                     content= open(file, 'r').read()
                     content=content.replace("""foot.html""",
                                                            """foot.jsp""")
                     open(file, 'w').write(content)
             
 