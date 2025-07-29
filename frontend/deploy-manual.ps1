# PowerShell Script para Deploy Manual no S3
# Execute este script para preparar os arquivos para upload

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName
)

Write-Host "🚀 Preparando deploy para bucket: $BucketName" -ForegroundColor Green

# Verificar se a pasta build existe
if (-not (Test-Path ".\build")) {
    Write-Host "❌ Pasta build não encontrada! Execute 'npm run build' primeiro." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Pasta build encontrada!" -ForegroundColor Green

# Listar arquivos que serão enviados
Write-Host "`n📁 Arquivos que serão enviados:" -ForegroundColor Yellow
Get-ChildItem -Path ".\build" -Recurse | ForEach-Object {
    if (-not $_.PSIsContainer) {
        $relativePath = $_.FullName -replace [regex]::Escape((Get-Location).Path + "\build\"), ""
        Write-Host "  - $relativePath" -ForegroundColor Gray
    }
}

Write-Host "`n📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Acesse o Console AWS S3" -ForegroundColor White
Write-Host "2. Navegue até o bucket: $BucketName" -ForegroundColor White
Write-Host "3. Selecione todos os arquivos da pasta 'build' (mostrada acima)" -ForegroundColor White
Write-Host "4. Faça upload via interface web do S3" -ForegroundColor White
Write-Host "5. Configure as permissões se necessário" -ForegroundColor White

Write-Host "`n🌐 Após o upload, seu site estará disponível em:" -ForegroundColor Green
Write-Host "http://$BucketName.s3-website-us-east-1.amazonaws.com" -ForegroundColor Blue

Write-Host "`n💡 Dica: Para uploads automáticos, configure o AWS CLI" -ForegroundColor Yellow

# Abrir pasta build no explorer
Write-Host "`n📂 Abrindo pasta build..." -ForegroundColor Green
Start-Process explorer.exe -ArgumentList ".\build"
