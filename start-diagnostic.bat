@echo off
chcp 65001 >nul 2>&1
cls
echo ========================================
echo    77qicode Diagnostic Startup
echo ========================================
echo.

echo [1/6] Checking Node.js in PATH...
where node >nul 2>&1
if %errorLevel% equ 0 (
    echo ✓ Node.js found in PATH
    node --version
    goto :check_files
) else (
    echo ✗ Node.js not found in PATH
    echo.
)

echo [2/6] Searching for Node.js in common locations...
set "NODE_FOUND=0"
set "NODE_PATH="

REM Check common installation paths
for %%P in (
    "C:\Program Files\nodejs\node.exe"
    "C:\Program Files (x86)\nodejs\node.exe"
    "%ProgramFiles%\nodejs\node.exe"
    "%ProgramFiles(x86)%\nodejs\node.exe"
    "%LOCALAPPDATA%\Programs\nodejs\node.exe"
    "%APPDATA%\npm\node.exe"
) do (
    if exist %%P (
        set "NODE_PATH=%%~P"
        set "NODE_FOUND=1"
        echo ✓ Found Node.js at: %%~P
        "%%~P" --version
        goto :found_node
    )
)

:found_node
if "%NODE_FOUND%"=="0" (
    echo ✗ Node.js not found in common locations
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart your computer and try again.
    echo.
    echo Or add Node.js to your PATH manually:
    echo 1. Find where Node.js is installed
    echo 2. Add that path to System Environment Variables
    echo 3. Restart Command Prompt
    echo.
    pause
    exit /b 1
)

:check_files
echo.
echo [3/6] Checking program files...
if exist "%~dp0dist\cli.js" (
    echo ✓ dist\cli.js exists
) else (
    echo ✗ dist\cli.js missing
    goto :error
)

if exist "%~dp0node_modules" (
    echo ✓ node_modules exists
) else (
    echo ✗ node_modules missing
    goto :error
)

echo.
echo [4/6] Checking MCP configuration...
if exist "%~dp0.mcp.json" (
    echo ✓ .mcp.json exists
) else (
    echo ✗ .mcp.json missing
    goto :error
)

if exist "%~dp0mcp-servers\claude-historian\dist\index.js" (
    echo ✓ MCP server files exist
) else (
    echo ✗ MCP server files missing
    goto :error
)

echo.
echo [5/6] Testing program startup...
if "%NODE_PATH%"=="" (
    node "%~dp0dist\cli.js" --version
) else (
    "%NODE_PATH%" "%~dp0dist\cli.js" --version
)

if %errorLevel% neq 0 (
    echo ✗ Program failed to start
    goto :error
) else (
    echo ✓ Program started successfully
)

echo.
echo [6/6] All checks passed!
echo.
echo ========================================
echo    Starting 77qicode...
echo ========================================
echo.

if "%NODE_PATH%"=="" (
    node "%~dp0dist\cli.js" %*
) else (
    "%NODE_PATH%" "%~dp0dist\cli.js" %*
)

exit /b 0

:error
echo.
echo ========================================
echo    Diagnostic Failed
echo ========================================
echo.
echo Please check the errors above and:
echo 1. Ensure Node.js is properly installed
echo 2. Verify all program files are present
echo 3. Try re-extracting the 77qicodess folder
echo.
pause
exit /b 1
