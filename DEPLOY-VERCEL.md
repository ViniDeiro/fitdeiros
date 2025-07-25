# 🚀 Deploy FitPlan na Vercel

Guia completo para fazer deploy do FitPlan na Vercel com banco PostgreSQL gratuito.

## 📋 Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Conta na [Neon](https://neon.tech) (PostgreSQL gratuito)
3. Código já commitado no GitHub

## 🗄️ 1. Configurar Banco de Dados

### Criar banco PostgreSQL gratuito na Neon:

1. Acesse [neon.tech](https://neon.tech) e crie uma conta
2. Clique em **"Create Project"**
3. Escolha:
   - **Project name**: `fitplan-db`
   - **Region**: `US East (Ohio)` (mais próximo do Brasil)
   - **PostgreSQL Version**: `15` (default)
4. Clique em **"Create Project"**
5. Na página do projeto, vá em **"Dashboard"**
6. Copie a **Connection String** (algo como):
   ```
   postgresql://username:password@host.neon.tech/dbname?sslmode=require
   ```

## ⚙️ 2. Configurar Vercel

### 2.1 Conectar repositório:

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New Project"**
3. Importe seu repositório do GitHub
4. **NÃO clique em Deploy ainda!** Primeiro configure as variáveis.

### 2.2 Configurar variáveis de ambiente:

Na página de configuração do projeto na Vercel, vá em **"Environment Variables"** e adicione:

```env
# Database
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# App
NODE_ENV=production
JWT_EXPIRES_IN=7d
PING_MESSAGE=FitPlan API is running!
```

**⚠️ IMPORTANTE:** 
- Use a **Connection String** copiada da Neon no `DATABASE_URL`
- Gere um `JWT_SECRET` forte (mínimo 32 caracteres)

### 2.3 Configurações de Build:

- **Build Command**: Deixe vazio (usa `vercel-build` do package.json)
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🚢 3. Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (pode demorar 3-5 minutos)
3. Se der erro, verifique os logs na aba **"Functions"**

## ✅ 4. Testar Deploy

Após o deploy, teste os endpoints:

### Health Check:
```bash
curl https://seu-app.vercel.app/api/health
```

### Registro de usuário:
```bash
curl -X POST https://seu-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Seu Nome",
    "email": "seu@email.com", 
    "password": "123456"
  }'
```

### Login:
```bash
curl -X POST https://seu-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu@email.com",
    "password": "123456"
  }'
```

## 🔧 5. Popular Banco (Opcional)

Para adicionar dados de exemplo, execute o seed:

```bash
# Localmente, apontando para produção
DATABASE_URL="sua-connection-string" npm run db:seed
```

**OU** crie um endpoint temporário para seed:

```typescript
// No server/index.ts, adicione temporariamente:
app.get("/api/admin/seed", async (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Execute seed aqui
  // Remova este endpoint após usar
});
```

## 🐛 Resolução de Problemas

### ❌ Erro 500 - Internal Server Error

1. **Verifique logs**: Vá na Vercel → Functions → Ver logs da function
2. **Database URL**: Confirme que está correto
3. **Prisma**: Pode não estar gerando o cliente corretamente

**Solução:**
```bash
# Localmente, teste se conecta:
DATABASE_URL="sua-url-produção" npx prisma db push
```

### ❌ Erro de CORS

Se o frontend não conseguir fazer requests:

```typescript
// server/index.ts - ajustar CORS
app.use(cors({
  origin: [
    'https://seu-app.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

### ❌ Function Timeout

Se der timeout nas functions:

```json
// vercel.json
{
  "functions": {
    "netlify/functions/api.ts": {
      "maxDuration": 30
    }
  }
}
```

### ❌ Erro de Prisma Client

Se der erro "Prisma Client não encontrado":

1. Verifique se `prisma generate` está no build
2. Confirme que `@prisma/client` está em `dependencies`, não `devDependencies`

## 🎯 URLs do Deploy

Após deploy bem-sucedido:

- **Frontend**: `https://seu-app.vercel.app`
- **API**: `https://seu-app.vercel.app/api`
- **Health**: `https://seu-app.vercel.app/api/health`

## 📊 Monitoramento

### Vercel Analytics:
- Ative nas configurações do projeto
- Monitore performance e erros

### Neon Dashboard:
- Monitore uso do banco
- Veja queries executadas
- Analise performance

## 🔄 Atualizações

Para atualizar o deploy:

1. **Commit** suas mudanças no GitHub
2. **Push** para a branch principal
3. **Vercel rebuilda automaticamente**

### Forçar rebuild:
- Vercel Dashboard → Deployments → Redeploy

## 💡 Dicas de Produção

1. **Configure domínio customizado** na Vercel
2. **Enable Analytics** para monitoramento
3. **Configure alertas** de erro via webhook
4. **Backup do banco** regular (Neon faz automático)
5. **Monitore limites** da Neon (500MB grátis)

## 🆘 Suporte

Se ainda tiver problemas:

1. **Verifique logs** na Vercel
2. **Teste endpoints** individualmente
3. **Confirme variáveis** de ambiente
4. **Valide banco** conectando localmente

---

**✅ Seu FitPlan está pronto para o mundo!** 🌍 