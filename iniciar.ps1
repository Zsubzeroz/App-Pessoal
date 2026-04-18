$ErrorActionPreference = "Stop"

Write-Host "=== Iniciando App Pessoal ===" -ForegroundColor Cyan
Write-Host "Ambiente: Desenvolvimento" -ForegroundColor Yellow

$env:NODE_ENV = "development"

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host "`nIniciando aplicativo..." -ForegroundColor Cyan
npm run electron-dev

