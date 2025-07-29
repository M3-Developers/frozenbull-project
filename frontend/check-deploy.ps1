# Script de Verificação de Deploy
Write-Host "🔍 VERIFICAÇÃO DE DEPLOY - REACT PARA S3" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Verificar se está na pasta correta
$currentPath = Get-Location
Write-Host "`n📁 Pasta atual: $currentPath" -ForegroundColor Yellow

# Verificar se build existe
if (Test-Path ".\build") {
    Write-Host "✅ Pasta 'build' encontrada!" -ForegroundColor Green
    
    # Mostrar arquivos principais
    Write-Host "`n📋 Arquivos principais do build:" -ForegroundColor Yellow
    if (Test-Path ".\build\index.html") { Write-Host "  ✅ index.html" -ForegroundColor Green }
    if (Test-Path ".\build\static") { Write-Host "  ✅ pasta static/" -ForegroundColor Green }
    if (Test-Path ".\build\manifest.json") { Write-Host "  ✅ manifest.json" -ForegroundColor Green }
    
    # Calcular tamanho total
    $totalSize = (Get-ChildItem -Path ".\build" -Recurse | Measure-Object -Property Length -Sum).Sum
    $sizeInMB = [math]::Round($totalSize / 1MB, 2)
    Write-Host "  📊 Tamanho total: $sizeInMB MB" -ForegroundColor Gray
    
} else {
    Write-Host "❌ Pasta 'build' NÃO encontrada!" -ForegroundColor Red
    Write-Host "   Execute: npm run build" -ForegroundColor Yellow
}

# Verificar Node.js
Write-Host "`n🟢 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js não encontrado!" -ForegroundColor Red
}

# Verificar npm
try {
    $npmVersion = npm --version  
    Write-Host "  ✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ npm não encontrado!" -ForegroundColor Red
}

# Verificar AWS CLI
Write-Host "`n☁️ Verificando AWS CLI..." -ForegroundColor Yellow
try {
    $awsVersion = aws --version 2>$null
    if ($awsVersion) {
        Write-Host "  ✅ AWS CLI instalado: $awsVersion" -ForegroundColor Green
        Write-Host "  💡 Você pode usar deploy automático!" -ForegroundColor Cyan
    }
} catch {
    Write-Host "  ⚠️ AWS CLI não configurado" -ForegroundColor Yellow
    Write-Host "  💡 Use deploy manual via console S3" -ForegroundColor Cyan
}

Write-Host "`n🎯 MÉTODOS DE DEPLOY DISPONÍVEIS:" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

Write-Host "`n1️⃣ DEPLOY MANUAL (Recomendado para iniciantes):" -ForegroundColor Green
Write-Host "   • Execute: .\deploy-manual.ps1 'nome-do-seu-bucket'" -ForegroundColor White
Write-Host "   • Faça upload via console AWS S3" -ForegroundColor White

Write-Host "`n2️⃣ DEPLOY AUTOMÁTICO (Se AWS CLI configurado):" -ForegroundColor Blue  
Write-Host "   • Configure o bucket no package.json" -ForegroundColor White
Write-Host "   • Execute: npm run deploy" -ForegroundColor White

Write-Host "`nDocumentacao completa: DEPLOY-GUIDE.md" -ForegroundColor Yellow
Write-Host "`nPronto para deploy!" -ForegroundColor Green
