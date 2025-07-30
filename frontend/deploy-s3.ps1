# PowerShell Script para Build e Deploy automatico no S3
# Este script faz o build do projeto e sincroniza com o bucket S3

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1"
)

Write-Host "Iniciando deploy automatico para S3" -ForegroundColor Green
Write-Host "Bucket: $BucketName" -ForegroundColor Cyan
Write-Host "Regiao: $Region" -ForegroundColor Cyan

# Verificar se AWS CLI esta instalado
try {
    $awsVersion = aws --version
    Write-Host "AWS CLI encontrado: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "AWS CLI nao encontrado! Instale o AWS CLI primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se AWS CLI esta configurado
try {
    $awsIdentity = aws sts get-caller-identity --output table 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "AWS CLI configurado corretamente" -ForegroundColor Green
        Write-Host $awsIdentity
    } else {
        Write-Host "AWS CLI nao esta configurado! Execute 'aws configure' primeiro." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Erro ao verificar configuracao do AWS CLI" -ForegroundColor Red
    exit 1
}

Write-Host "`nFazendo build do projeto..." -ForegroundColor Yellow

# Fazer build do projeto
try {
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Build realizado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "Erro durante o build!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Erro ao executar npm run build" -ForegroundColor Red
    exit 1
}

# Verificar se a pasta build existe
if (-not (Test-Path ".\build")) {
    Write-Host "Pasta build nao foi criada!" -ForegroundColor Red
    exit 1
}

Write-Host "`nListando arquivos que serao enviados:" -ForegroundColor Yellow
Get-ChildItem -Path ".\build" -Recurse | ForEach-Object {
    if (-not $_.PSIsContainer) {
        $relativePath = $_.FullName -replace [regex]::Escape((Get-Location).Path + "\build\"), ""
        Write-Host "  - $relativePath" -ForegroundColor Gray
    }
}

Write-Host "`nSincronizando com S3..." -ForegroundColor Yellow
Write-Host "Arquivos antigos serao removidos" -ForegroundColor Red

# Sincronizar com S3
try {
    aws s3 sync .\build s3://$BucketName --delete --region $Region
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nDeploy realizado com sucesso!" -ForegroundColor Green
        Write-Host "`nSeu site esta disponivel em:" -ForegroundColor Cyan
        Write-Host "- Website Endpoint: http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Blue
        Write-Host "- S3 Console: https://s3.console.aws.amazon.com/s3/buckets/$BucketName" -ForegroundColor Blue
        
        Write-Host "`nEstatisticas do deploy:" -ForegroundColor Yellow
        aws s3 ls s3://$BucketName --recursive --human-readable --summarize
    } else {
        Write-Host "Erro durante o sync com S3!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Erro ao executar aws s3 sync" -ForegroundColor Red
    exit 1
}

Write-Host "`nDeploy concluido com sucesso!" -ForegroundColor Green
