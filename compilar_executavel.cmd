@echo off
cd /d "%~dp0"
echo Compilando o aplicativo...
npm run electron-build
echo.
echo Executável criado em: dist/
pause
