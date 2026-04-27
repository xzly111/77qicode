@echo off
chcp 65001 >nul
title 77qicode 一键安装程序
color 0A

echo.
echo ========================================
echo    77qicode 一键安装程序 v3.1.0
echo ========================================
echo.
echo 正在检查系统环境...
echo.

:: 检查 Node.js
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] 未检测到 Node.js
    echo.
    echo 77qicode 需要 Node.js 才能运行。
    echo.
    echo 请选择安装方式:
    echo.
    echo [1] 自动下载并安装 Node.js (推荐)
    echo [2] 手动安装 Node.js
    echo [3] 退出安装
    echo.
    set /p choice="请输入选项 (1/2/3): "

    if "%choice%"=="1" goto auto_install_node
    if "%choice%"=="2" goto manual_install_node
    if "%choice%"=="3" goto exit_installer

    echo 无效选项，退出安装。
    pause
    exit /b 1
)

:: Node.js 已安装
echo [√] Node.js 已安装
node --version
echo.

:: 开始安装
echo ========================================
echo    开始安装 77qicode
echo ========================================
echo.

:: 创建安装目录
set INSTALL_DIR=%USERPROFILE%\77qicode
echo 安装位置: %INSTALL_DIR%
echo.

if exist "%INSTALL_DIR%" (
    echo [!] 检测到已存在的安装
    set /p overwrite="是否覆盖安装? (Y/N): "
    if /i not "%overwrite%"=="Y" (
        echo 取消安装。
        pause
        exit /b 0
    )
    echo 正在删除旧版本...
    rmdir /s /q "%INSTALL_DIR%"
)

echo 正在创建安装目录...
mkdir "%INSTALL_DIR%"

:: 复制文件
echo 正在复制程序文件...
xcopy /E /I /Y "%~dp0dist" "%INSTALL_DIR%\dist" >nul
xcopy /E /I /Y "%~dp0node_modules" "%INSTALL_DIR%\node_modules" >nul
copy /Y "%~dp0package.json" "%INSTALL_DIR%\" >nul
copy /Y "%~dp0.mcp.json" "%INSTALL_DIR%\" >nul

if exist "%~dp0scripts" (
    xcopy /E /I /Y "%~dp0scripts" "%INSTALL_DIR%\scripts" >nul
)

echo [√] 文件复制完成
echo.

:: 创建启动脚本
echo 正在创建启动脚本...
(
echo @echo off
echo chcp 65001 ^>nul
echo node "%INSTALL_DIR%\dist\cli.js" %%*
) > "%INSTALL_DIR%\77qicode.bat"

echo [√] 启动脚本创建完成
echo.

:: 添加到 PATH
echo 正在配置环境变量...
setx PATH "%PATH%;%INSTALL_DIR%" >nul 2>&1
echo [√] 环境变量配置完成
echo.

:: 创建桌面快捷方式
echo 正在创建桌面快捷方式...
set DESKTOP=%USERPROFILE%\Desktop
(
echo Set oWS = WScript.CreateObject^("WScript.Shell"^)
echo sLinkFile = "%DESKTOP%\77qicode.lnk"
echo Set oLink = oWS.CreateShortcut^(sLinkFile^)
echo oLink.TargetPath = "%INSTALL_DIR%\77qicode.bat"
echo oLink.WorkingDirectory = "%INSTALL_DIR%"
echo oLink.Description = "77qicode - AI 编码助手"
echo oLink.Save
) > "%TEMP%\create_shortcut.vbs"
cscript //nologo "%TEMP%\create_shortcut.vbs"
del "%TEMP%\create_shortcut.vbs"
echo [√] 桌面快捷方式创建完成
echo.

:: 安装完成
echo ========================================
echo    安装完成！
echo ========================================
echo.
echo 安装位置: %INSTALL_DIR%
echo.
echo 使用方法:
echo   1. 双击桌面上的 "77qicode" 快捷方式
echo   2. 或在命令行输入: 77qicode
echo.
echo 注意: 首次运行需要配置 API 密钥
echo.
set /p launch="是否立即启动 77qicode? (Y/N): "
if /i "%launch%"=="Y" (
    echo.
    echo 正在启动...
    echo.
    start "" "%INSTALL_DIR%\77qicode.bat"
)

echo.
echo 感谢使用 77qicode！
pause
exit /b 0

:auto_install_node
echo.
echo 正在打开 Node.js 下载页面...
echo.
echo 请按照以下步骤操作:
echo 1. 下载 LTS 版本 (推荐 v20.x)
echo 2. 运行安装程序
echo 3. 安装时勾选 "Add to PATH"
echo 4. 安装完成后重启电脑
echo 5. 重新运行本安装程序
echo.
start https://nodejs.org/
pause
exit /b 0

:manual_install_node
echo.
echo 请手动安装 Node.js:
echo.
echo 1. 访问 https://nodejs.org/
echo 2. 下载 LTS 版本 (推荐 v20.x)
echo 3. 运行安装程序
echo 4. 安装时勾选 "Add to PATH"
echo 5. 安装完成后重启电脑
echo 6. 重新运行本安装程序
echo.
pause
exit /b 0

:exit_installer
echo.
echo 退出安装。
pause
exit /b 0
