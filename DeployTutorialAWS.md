# Frozenbull Project

Este projeto contém uma aplicação React (frontend) com deploy automatizado para Amazon S3.

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [AWS CLI](https://aws.amazon.com/cli/) instalado e configurado
- Conta AWS com permissões para S3 e IAM

## 🚀 Deploy Automático para S3

### 1. Instalação do AWS CLI no Windows

#### Opção 1: Download direto (Recomendado)
1. Baixe o AWS CLI v2 para Windows: [https://awscli.amazonaws.com/AWSCLIV2.msi](https://awscli.amazonaws.com/AWSCLIV2.msi)
2. Execute o instalador
3. Abra um novo PowerShell/CMD para usar o comando `aws`

#### Opção 2: Via PowerShell (winget)
```powershell
winget install Amazon.AWSCLI
```

#### Verificar instalação
```powershell
aws --version
```nom

### 2. Configuração das Credenciais AWS

#### Passo 1: Criar Access Keys no Console AWS

1. **Acesse o Console AWS**: [https://aws.amazon.com/console/](https://aws.amazon.com/console/)
2. **Vá para IAM**: Services > IAM > Users
3. **Selecione seu usuário** (ou crie um novo)
4. **Clique na aba "Security credentials"**
5. **Clique em "Create access key"**
6. **Selecione "Command Line Interface (CLI)"**
7. **Baixe ou copie as credenciais**: 
   - `Access Key ID`
   - `Secret Access Key`

⚠️ **IMPORTANTE**: O Secret Access Key só é exibido uma vez. Salve-o imediatamente!

#### Passo 2: Permissões IAM Necessárias

Certifique-se de que seu usuário IAM tenha as seguintes permissões:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "iam:CreateAccessKey",
                "iam:DeleteAccessKey",
                "iam:UpdateAccessKey",
                "iam:GetAccessKeyLastUsed",
                "iam:ListAccessKeys",
                "iam:ListUserTags"
            ],
            "Resource": "*"
        }
    ]
}
```

#### Passo 3: Configurar AWS CLI

Execute o comando abaixo e insira suas credenciais:

```powershell
aws configure
```

Quando solicitado, insira:
- **AWS Access Key ID**: `sua-access-key-aqui`
- **AWS Secret Access Key**: `sua-secret-key-aqui`
- **Default region name**: `us-east-1` (ou sua região preferida)
- **Default output format**: `table` (recomendado para visualização)

#### Passo 4: Verificar configuração

```powershell
aws sts get-caller-identity
```

### 3. Configuração do Bucket S3

#### Criar bucket via AWS CLI
```powershell
aws s3 mb s3://frozenbull-website --region us-east-1
```

#### Configurar bucket para hosting estático
```powershell
# Habilitar website hosting
aws s3 website s3://frozenbull-website --index-document index.html --error-document index.html

# Configurar política pública (opcional - para sites públicos)
aws s3api put-bucket-policy --bucket frozenbull-website --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::frozenbull-website/*"
        }
    ]
}'
```

### 4. Como usar o Deploy Automático

#### Método 1: Via script PowerShell (Recomendado)
```powershell
cd frontend
.\deploy-s3.ps1 -BucketName "frozenbull-website"
```

#### Método 2: Via npm script
```powershell
cd frontend
npm run deploy:auto
```

#### Com região específica
```powershell
.\deploy-s3.ps1 -BucketName "frozenbull-website" -Region "us-west-2"
```

### 5. O que o script `deploy-s3.ps1` faz

O script de deploy automatiza todo o processo de build e publicação:

#### 🔍 **Verificações Iniciais**
- Confirma se o AWS CLI está instalado
- Verifica se as credenciais AWS estão configuradas
- Exibe informações da conta AWS conectada

#### 🔨 **Build do Projeto**
- Executa `npm run build` para gerar os arquivos otimizados
- Verifica se a pasta `build/` foi criada com sucesso
- Lista todos os arquivos que serão enviados

#### ☁️ **Sincronização com S3**
- Usa `aws s3 sync` para enviar arquivos para o bucket
- **`--delete`**: Remove arquivos antigos do S3 que não existem localmente
- **`--region`**: Especifica a região do bucket
- Garante que o bucket tenha exatamente os mesmos arquivos da pasta `build/`

#### 📊 **Relatório de Deploy**
- Exibe o status do deploy (sucesso/erro)
- Mostra a URL do website hospedado
- Lista estatísticas dos arquivos enviados
- Fornece link para o console S3

### 6. Comandos Úteis

#### Build manual apenas
```powershell
npm run build
```

#### Sync manual com S3
```powershell
aws s3 sync .\build s3://frozenbull-website --delete
```

#### Verificar arquivos no bucket
```powershell
aws s3 ls s3://frozenbull-website --recursive --human-readable
```

#### Limpar bucket (cuidado!)
```powershell
aws s3 rm s3://frozenbull-website --recursive
```

### 7. URLs do Site

Após o deploy, seu site estará disponível em:
- **Website Endpoint**: `http://frozenbull-website.s3-website-us-east-1.amazonaws.com`
- **S3 Console**: `https://s3.console.aws.amazon.com/s3/buckets/frozenbull-website`

### 8. Troubleshooting

#### Erro: "aws: command not found"
- Reinstale o AWS CLI
- Reinicie o terminal após a instalação

#### Erro: "The AWS Access Key Id you provided does not exist"
- Verifique se as credenciais estão corretas
- Execute `aws configure` novamente

#### Erro: "Access Denied"
- Verifique as permissões IAM do usuário
- Certifique-se de ter permissões para S3 e IAM

#### Erro de build npm
- Execute `npm install` primeiro
- Verifique se o Node.js está instalado

### 9. Segurança

- ✅ Nunca commit suas credenciais AWS no código
- ✅ Use políticas IAM com menor privilégio necessário
- ✅ Rotacione suas Access Keys regularmente
- ✅ Use variáveis de ambiente em produção

### 10. Exemplo de Deploy Bem-sucedido

Quando o deploy é executado com sucesso, você verá uma saída similar a esta:

```
Iniciando deploy automatico para S3
Bucket: frozenbull-website
Regiao: us-east-1
AWS CLI encontrado: aws-cli/2.27.61 Python/3.13.4 Windows/11 exe/AMD64
AWS CLI configurado corretamente

Fazendo build do projeto...
Build realizado com sucesso!

Listando arquivos que serao enviados:
  - asset-manifest.json
  - favicon.ico  
  - index.html
  - logo192.png
  - logo512.png
  - manifest.json
  - robots.txt
  - static\css\main.c2ad2879.css
  - static\js\main.600b2a80.js
  [... outros arquivos ...]

Sincronizando com S3...
Arquivos antigos serao removidos
upload: build\index.html to s3://frozenbull-website/index.html
upload: build\static\js\main.600b2a80.js to s3://frozenbull-website/static/js/main.600b2a80.js
[... outros uploads ...]

Deploy realizado com sucesso!

Seu site esta disponivel em:
- Website Endpoint: http://frozenbull-website.s3-website-us-east-1.amazonaws.com
- S3 Console: https://s3.console.aws.amazon.com/s3/buckets/frozenbull-website

Estatisticas do deploy:
Total Objects: 14
Total Size: 1.7 MiB

Deploy concluido com sucesso!
```

Isso significa que todos os arquivos foram enviados com sucesso para o bucket S3 e seu site está online!

---

## 🛠️ Desenvolvimento

### Instalação
```bash
cd frontend
npm install
```

### Execução local
```bash
npm start
```

### Build de produção
```bash
npm run build
```