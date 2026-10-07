@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 8765 --bind 127.0.0.1
) else (
  python -m http.server 8765 --bind 127.0.0.1
)
