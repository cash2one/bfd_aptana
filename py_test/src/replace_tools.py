#coding=utf-8
import os

if __name__ == '__main__':
    for file in os.listdir(os.getcwd()):
         if file.endswith('html') or file.endswith('jsp'):
             content= open(file, 'r').read()
             content=content.replace("""css/style-1.css""",
                                                    """../../css/style-1.css""")
             content=content.replace("""css/style-2.css""",
                                                    """../../css/style-2.css""")
             content=content.replace("""css/plugin.css""",
                                                    """../../css/plugin.css""")
             content=content.replace("""src="images/""",
                                                    """src="../../images/""")
             open(file, 'w').write(content)
             
 