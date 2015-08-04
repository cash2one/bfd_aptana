#coding=utf-8
import os

if __name__ == '__main__':
    for file in os.listdir(os.getcwd()):
         if file.endswith('html'):
             content= open(file, 'r').read()
             content=content.replace("""<script type="text/javascript" language="JavaScript" src="../resources/jquery/jquery.js">
        </script>""","""<script type="text/javascript" language="JavaScript" src="../resources/jquery/jquery.js">
        </script>
        <script type="text/javascript" language="JavaScript" src="../resources/commons/global-loading.js">
        </script>""")
             open(file, 'w').write(content)
             
 