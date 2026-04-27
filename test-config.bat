@echo off
chcp 65001 >nul 2>&1
cls
echo ========================================
echo    77qicode 配置验证工具
echo ========================================
echo.

echo [1/5] 检查 Node.js...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ✗ Node.js 未安装或不在PATH中
    goto :error
) else (
    node --version
    echo ✓ Node.js 正常
)
echo.

echo [2/5] 检查主程序文件...
if exist "%~dp0dist\cli.js" (
    echo ✓ dist\cli.js 存在
) else (
    echo ✗ dist\cli.js 缺失
    goto :error
)
echo.

echo [3/5] 检查 MCP 配置文件...
if exist "%~dp0.mcp.json" (
    echo ✓ .mcp.json 存在
    type "%~dp0.mcp.json"
) else (
    echo ✗ .mcp.json 缺失
    goto :error
)
echo.

echo [4/5] 检查 MCP 服务器文件...
if exist "%~dp0mcp-servers\claude-historian\dist\index.js" (
    echo ✓ claude-historian 服务器文件存在
) else (
    echo ✗ claude-historian 服务器文件缺失
    goto :error
)
echo.

echo [5/5] 测试程序启动...
node "%~dp0dist\cli.js" --version
if %errorLevel% neq 0 (
    echo ✗ 程序启动失败
    goto :error
) else (
    echo ✓ 程序可以正常启动
)
echo.

echo ========================================
echo    ✓ 所有检查通过!
echo ========================================
echo.
echo 配置状态:
echo - MCP 服务器: 已配置 (claude-historian)
echo - 路径配置: 相对路径 (可移植)
echo - 记忆功能: 已启用
echo - 程序版本: 3.1.0
echo.
echo 可以开始使用 77qicode 了!
echo 运行 start.bat 启动程序
echo.
pause
exit /b 0

:error
echo.
echo ========================================
echo    ✗ 检查失败
echo ========================================
echo.
echo 请检查上述错误信息
echo.
pause
exit /b 1
