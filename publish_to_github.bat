@echo off
title Push RazorNexus to GitHub
cls
echo ==============================================================================
echo   Publish RazorNexus to GitHub
echo   Engineered by Palash Tripathi
echo ==============================================================================
echo.

where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Git is not installed or not in your PATH.
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo Or install via PowerShell: winget install --id Git.Git -e --source winget
    echo.
    pause
    exit /b
)

echo [1/4] Initializing local git repository...
git init

echo [2/4] Staging project files...
git add .

echo [3/4] Creating initial commit...
git commit -m "feat: Initial commit of RazorNexus — Autonomous Agentic Commerce Protocol"

echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/razor-nexus.git): "

if "%REPO_URL%"=="" (
    echo [!] No repository URL provided. Skipping remote push.
    echo You can push manually later using:
    echo   git remote add origin YOUR_REPO_URL
    echo   git branch -M main
    echo   git push -u origin main
    pause
    exit /b
)

echo [4/4] Pushing to %REPO_URL%...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ==============================================================================
echo   SUCCESS! Project published to GitHub.
echo ==============================================================================
pause
