# 77qicode Quick Start Guide

Version: 3.1.0
Date: 2026-04-11

========================================
  IMPORTANT - Character Encoding Issue Fixed
========================================

Previous versions had Chinese character encoding problems.
This version uses ENGLISH-ONLY scripts to avoid encoding issues.

========================================
  Quick Start (3 Steps)
========================================

1. Extract to any location

2. Double-click "start.bat" (recommended)
   or
   Double-click "start-diagnostic.bat" (for troubleshooting)

3. Configure API key on first run

========================================
  System Requirements
========================================

Required: Node.js >= 18.0.0

Verify Node.js installation:
1. Open Command Prompt
2. Type: node --version
3. Should display version (e.g., v20.11.0)

========================================
  Startup Scripts
========================================

start.bat
- Simple startup script
- Pure English, no encoding issues
- Recommended for normal use

start-diagnostic.bat
- Shows detailed diagnostic steps
- Checks Node.js, files, dependencies
- Use this if start.bat fails
- Will not flash and close - shows all errors

========================================
  Troubleshooting
========================================

Problem: Script flashes and closes

Solution:
1. Use "start-diagnostic.bat" instead
2. It will show detailed error messages
3. Screenshot the error and report back

Problem: Node.js not found

Solution:
1. Verify Node.js is installed
2. Open Command Prompt
3. Type: node --version
4. If error, reinstall Node.js from https://nodejs.org/

Problem: Files not found

Solution:
1. Re-extract the zip file
2. Ensure these exist:
   - dist/cli.js
   - node_modules/
   - .mcp.json

========================================
  Manual Start Method
========================================

If scripts don't work, try manual start:

1. Open Command Prompt in the extracted folder
2. Type: node dist\cli.js
3. Check error messages

========================================
  What Changed in This Version
========================================

- Fixed character encoding issues
- All scripts now use English only
- No more garbled Chinese characters
- Scripts will not flash and close
- Better error messages

========================================
