@echo off 
for /f "delims=" %%i in ('dir /b /a-d /s "*.js"')  do ( 
  uglifyjs --overwrite %%i 
)
pause