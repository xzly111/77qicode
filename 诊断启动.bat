@echo off
chcp 65001 >nul 2>&1
cls
echo ========================================
echo    77qicode 诊断启动器
echo ========================================
echo.

echo [1/5] 检查 Node.js...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [×] Node.js 未找到
    echo.
    pause
    exit /b 1
)
echo [√] Node.js 已安装
node --version
echo.

echo [2/5] 检查当前目录...
echo 当前目录: %~dp0
echo.

echo [3/5] 检查程序文件...
if not exist "%~dp0dist\cli.js" (
    echo [×] 找不到 dist\cli.js
    echo.
    pause
    exit /b 1
)
echo [√] 程序文件存在
echo.

echo [4/5] 检查 node_modules...
if not exist "%~dp0node_modules" (
    echo [×] 找不到 node_modules 目录
    echo.
    pause
    exit /b 1
)
echo [√] node_modules 存在
echo.

echo [5/5] 启动程序...
echo.
echo ========================================
echo.

node "%~dp0dist\cli.js" %*

set EXIT_CODE=%errorLevel%

echo.
echo ========================================
echo    程序已退出
echo ========================================
echo 退出代码: %EXIT_CODE%
echo.

if %EXIT_CODE% neq 0 (
    echo 启动失败，请将上述信息截图反馈
    echo.
)

pause
