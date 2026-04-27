@echo off
chcp 65001 >nul 2>&1
cls
echo ========================================
echo    77qicode 启动中...
echo ========================================
echo.

REM Try to find Node.js in PATH
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

REM If still not found, show error
echo ========================================
echo    启动失败
echo ========================================
echo.
echo 未找到 Node.js!
echo.
echo 可能的原因:
echo 1. Node.js 未安装
echo 2. Node.js 未添加到系统 PATH 环境变量
echo.
echo 解决方法:
echo 1. 运行 "start-diagnostic.bat" 查看详细诊断信息
echo 2. 或从 https://nodejs.org/ 下载安装 Node.js
echo 3. 安装时勾选 "Add to PATH" 选项
echo.
pause
exit /b 1
