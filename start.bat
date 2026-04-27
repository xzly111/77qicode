@echo off
chcp 65001 >nul 2>&1

REM Try to find Node.js
where node >nul 2>&1
if %errorLevel% equ 0 (
    node "%~dp0dist\cli.js" %*
    exit /b %errorLevel%
)

REM If not in PATH, search common locations
for %%P in (
    "C:\Program Files\nodejs\node.exe"
    "C:\Program Files (x86)\nodejs\node.exe"
    "%LOCALAPPDATA%\Programs\nodejs\node.exe"
) do (
    if exist %%P (
        "%%~P" "%~dp0dist\cli.js" %*
        exit /b %errorLevel%
    )
)

REM If still not found, show error and suggest diagnostic
echo Node.js not found!
echo.
echo Please run "start-diagnostic.bat" for detailed troubleshooting.
echo.
pause
exit /b 1
