@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title 77qicode 启动器
color 0A

echo.
echo ========================================
echo    77qicode 启动器 v3.1.0
echo ========================================
echo.

:: 方法1: 尝试使用系统 PATH 中的 node
echo [1/4] 尝试使用系统 Node.js...
where node >nul 2>&1
if %errorLevel% equ 0 (
    echo [√] 找到系统 Node.js
    node --version
    echo.
    echo 正在启动 77qicode...
    node "%~dp0dist\cli.js" %*
    goto end
)

:: 方法2: 尝试常见的 Node.js 安装路径
echo [×] 系统 PATH 中未找到 Node.js
echo.
echo [2/4] 尝试常见安装路径...

set "NODE_PATHS=C:\Program Files\nodejs\node.exe"
set "NODE_PATHS=!NODE_PATHS!;C:\Program Files (x86)\nodejs\node.exe"
set "NODE_PATHS=!NODE_PATHS!;%LOCALAPPDATA%\Programs\nodejs\node.exe"
set "NODE_PATHS=!NODE_PATHS!;%APPDATA%\npm\node.exe"

for %%p in (!NODE_PATHS!) do (
    if exist "%%p" (
        echo [√] 找到 Node.js: %%p
        "%%p" --version
        echo.
        echo 正在启动 77qicode...
        "%%p" "%~dp0dist\cli.js" %*
        goto end
    )
)

echo [×] 常见路径中未找到 Node.js
echo.

:: 方法3: 让用户手动指定 Node.js 路径
echo [3/4] 手动指定 Node.js 路径
echo.
echo 如果您已安装 Node.js，请输入 node.exe 的完整路径
echo 例如: C:\Program Files\nodejs\node.exe
echo.
echo 或者按 Enter 跳过此步骤
echo.
set /p "CUSTOM_NODE=请输入路径: "

if not "!CUSTOM_NODE!"=="" (
    if exist "!CUSTOM_NODE!" (
        echo [√] 找到 Node.js: !CUSTOM_NODE!
        "!CUSTOM_NODE!" --version
        echo.
        echo 正在启动 77qicode...
        "!CUSTOM_NODE!" "%~dp0dist\cli.js" %*
        goto end
    ) else (
        echo [×] 路径不存在: !CUSTOM_NODE!
        echo.
    )
)

:: 方法4: 引导用户安装 Node.js
echo [4/4] 需要安装 Node.js
echo.
echo ========================================
echo    未检测到 Node.js
echo ========================================
echo.
echo 77qicode 需要 Node.js 才能运行。
echo.
echo 请选择:
echo.
echo [1] 打开 Node.js 官网下载页面
echo [2] 查看详细安装说明
echo [3] 退出
echo.
set /p "choice=请输入选项 (1/2/3): "

if "!choice!"=="1" (
    echo.
    echo 正在打开 Node.js 下载页面...
    start https://nodejs.org/
    echo.
    echo 安装步骤:
    echo 1. 下载 LTS 版本 ^(推荐 v20.x^)
    echo 2. 运行安装程序
    echo 3. 安装时勾选 "Add to PATH"
    echo 4. 安装完成后重启电脑
    echo 5. 重新运行本启动器
    echo.
    pause
    goto end
)

if "!choice!"=="2" (
    echo.
    echo ========================================
    echo    Node.js 安装说明
    echo ========================================
    echo.
    echo 1. 访问 https://nodejs.org/
    echo 2. 点击 "LTS" 版本下载 ^(推荐 v20.x^)
    echo 3. 运行下载的安装程序
    echo 4. 安装过程中:
    echo    - 勾选 "Add to PATH"
    echo    - 使用默认安装路径
    echo 5. 安装完成后重启电脑
    echo 6. 验证安装:
    echo    - 打开命令提示符
    echo    - 输入: node --version
    echo    - 应该显示版本号
    echo 7. 重新运行本启动器
    echo.
    echo ========================================
    echo.
    pause
    goto end
)

:end
endlocal
