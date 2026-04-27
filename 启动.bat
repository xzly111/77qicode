@echo off
chcp 65001 >nul
node "%~dp0dist\cli.js" %*
if %errorLevel% neq 0 (
    echo.
    echo 启动失败，请按任意键退出...
    pause >nul
)
