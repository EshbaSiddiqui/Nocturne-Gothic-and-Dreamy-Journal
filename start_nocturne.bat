@echo off
title Nocturne - Gothic Personal Sanctuary
cd /d "%~dp0"

echo ========================================================
echo   NOCTURNE - Personal Gothic Diary Web App
echo ========================================================
echo.

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting Nocturne with Python local server...
    python server.py
    pause
    exit /b
)

if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    echo Starting Nocturne with Python 3.12...
    "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" server.py
    pause
    exit /b
)

if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    echo Starting Nocturne with Python 3.13...
    "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" server.py
    pause
    exit /b
)

echo Python not found in standard paths, launching index.html directly in your default browser...
start "" "index.html"
exit /b
