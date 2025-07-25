# 🚀 FitPlan Backend

Backend completo para o aplicativo FitPlan - Sistema de treinos e dietas personalizados.

## 📋 Funcionalidades

- ✅ **Autenticação JWT** - Registro, login e proteção de rotas
- 💪 **Sistema de Treinos** - Planos, exercícios e sessões de treino
- 🍽️ **Sistema de Dietas** - Planos nutricionais e refeições
- 🛒 **Lista de Compras** - Geração automática baseada na dieta
- 📊 **Acompanhamento de Progresso** - Controle de peso e medidas
- 🎯 **Perfis Personalizados** - Biotipo, objetivos e preferências

## 🛠️ Tecnologias

- **Node.js** + **Express** - Servidor web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **Zod** - Validação de dados
- **bcryptjs** - Criptografia de senhas
- **TypeScript** - Tipagem estática

## 🚀 Instalação e Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="fitplan-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV="development"

# Demo message
PING_MESSAGE="FitPlan API is running!"

# Upload
UPLOAD_PATH="./uploads"
MAX_FILE_SIZE=5242880
```

### 3. Configurar Banco de Dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Aplicar migrações
npm run db:push

# Popular banco com dados de exemplo
npm run db:seed
```

### 4. Iniciar Servidor

```bash
# Desenvolvimento
npm run dev:server

# Produção
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3001`

## 📚 Endpoints da API

### 🔐 Autenticação (`/api/auth`)

#### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Buscar Perfil
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Criar Perfil
```http
POST /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "bodyType": "ectomorfo",
  "currentWeight": 65.0,
  "targetWeight": 75.0,
  "height": 1.75,
  "age": 25,
  "gender": "masculino",
  "goal": "ganhar-peso",
  "timeframe": "6 meses",
  "budget": 400.0,
  "activityLevel": "moderado"
}
```

### 💪 Treinos (`/api/workouts`)

#### Listar Planos de Treino
```http
GET /api/workouts/plans
Authorization: Bearer <token>
```

#### Buscar Plano Ativo
```http
GET /api/workouts/plans/active
Authorization: Bearer <token>
```

#### Buscar Plano Específico
```http
GET /api/workouts/plans/:id
Authorization: Bearer <token>
```

#### Criar Sessão de Treino
```http
POST /api/workouts/sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "workoutPlanId": "plan-id",
  "date": "2024-01-15T18:00:00Z",
  "duration": 45,
  "notes": "Treino focado em peito"
}
```

#### Listar Exercícios
```http
GET /api/workouts/exercises?category=Peito&difficulty=intermediate
Authorization: Bearer <token>
```

## 🗄️ Estrutura do Banco de Dados

### Principais Tabelas

- **users** - Usuários do sistema
- **user_profiles** - Perfis detalhados dos usuários  
- **workout_plans** - Planos de treino
- **workouts** - Treinos individuais
- **exercises** - Exercícios base
- **workout_exercises** - Exercícios dentro de treinos
- **workout_sessions** - Sessões realizadas
- **diet_plans** - Planos de dieta
- **meals** - Refeições
- **shopping_lists** - Listas de compras
- **progress** - Acompanhamento de progresso

### Relacionamentos

```
User (1) -> (1) UserProfile
User (1) -> (N) WorkoutPlan
User (1) -> (N) WorkoutSession
User (1) -> (N) DietPlan
User (1) -> (N) ShoppingList
User (1) -> (N) Progress

WorkoutPlan (1) -> (N) Workout
Workout (1) -> (N) WorkoutExercise
Exercise (1) -> (N) WorkoutExercise
```

## 🧪 Dados de Teste

Após executar `npm run db:seed`, você terá:

**Usuário Demo:**
- Email: `demo@fitplan.com`
- Senha: `123456`

**Dados inclusos:**
- 13 exercícios base (peito, costas, pernas, ombros, braços)
- Perfil completo do usuário demo
- Plano de treino de 4 dias por semana
- Exercícios organizados por grupos musculares

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev:server          # Servidor em modo watch
npm run dev                 # Frontend + Backend

# Banco de dados
npm run db:generate         # Gerar cliente Prisma
npm run db:push            # Aplicar mudanças no schema
npm run db:migrate         # Criar nova migração
npm run db:studio          # Interface web do banco
npm run db:seed            # Popular banco com dados

# Build e deploy
npm run build              # Build para produção
npm start                  # Servidor em produção

# Utilitários
npm run typecheck          # Verificar tipos TypeScript
npm test                   # Executar testes
```

## 📊 Monitoramento

### Health Check
```http
GET /api/health
```

Retorna status do servidor e conexão com banco de dados.

### Logs
O servidor registra automaticamente:
- Requisições HTTP
- Erros de banco de dados
- Falhas de autenticação
- Operações importantes

## 🔒 Segurança

- **Senhas** criptografadas com bcrypt (12 rounds)
- **JWT tokens** com expiração configurável
- **CORS** configurado para domínios específicos
- **Validação** rigorosa de dados com Zod
- **Rate limiting** recomendado para produção

## 🚢 Deploy

### Variáveis de Ambiente para Produção

```env
NODE_ENV="production"
DATABASE_URL="postgresql://user:pass@host:5432/db"
JWT_SECRET="strong-random-secret-key"
PORT=3001
```

### Recomendações

1. **PostgreSQL** em produção (ao invés de SQLite)
2. **Redis** para cache e sessions
3. **Rate limiting** com express-rate-limit
4. **Logs estruturados** com winston
5. **Monitoramento** com Sentry ou similar

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Faça push para a branch
5. Abra um Pull Request

## 📝 Próximos Passos

- [ ] APIs de Dieta e Nutrição
- [ ] Sistema de Notificações
- [ ] Upload de fotos de progresso
- [ ] Integração com wearables
- [ ] Sistema de coaching IA
- [ ] Relatórios de progresso

---

## 🆘 Suporte

Para dúvidas ou problemas:

1. Verificar logs do servidor
2. Checar health check (`/api/health`)
3. Verificar variáveis de ambiente
4. Consultar documentação do Prisma

**Status do Backend:** ✅ Funcional e pronto para uso! 