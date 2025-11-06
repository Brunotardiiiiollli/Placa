# YouTube Shorts Generator - Backend

Este é o backend para o YouTube Shorts Generator, construído com Node.js, Express, tRPC, Drizzle ORM e MySQL.

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- MySQL 8.0+
- pnpm (recomendado) ou npm/yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/youtube-shorts-generator.git
   cd backend
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis de ambiente necessárias

4. **Configure o banco de dados**
   - Crie um banco de dados MySQL
   - Atualize as credenciais no arquivo `.env`
   - Execute as migrações:
     ```bash
     pnpm db:push
     ```

5. **Inicie o servidor**
   - Modo desenvolvimento:
     ```bash
     pnpm dev
     ```
   - Modo produção:
     ```bash
     pnpm build
     pnpm start
     ```

## 📦 Estrutura do Projeto

```
backend/
├── src/
│   ├── config.ts          # Configurações do aplicativo
│   ├── index.ts           # Ponto de entrada do servidor
│   ├── trpc/
│   │   └── index.ts       # Configuração do tRPC
│   ├── db/
│   │   ├── index.ts       # Configuração do banco de dados
│   │   └── schema.ts      # Esquema do banco de dados
│   └── routers/
│       ├── index.ts       # Exportação dos roteadores
│       ├── auth.ts        # Rotas de autenticação
│       └── ...            # Outros roteadores
├── .env.example          # Modelo de variáveis de ambiente
├── package.json          # Dependências e scripts
└── tsconfig.json         # Configuração do TypeScript
```

## 🔧 Variáveis de Ambiente

| Variável                | Descrição                                 | Obrigatório | Padrão          |
|-------------------------|-------------------------------------------|-------------|-----------------|
| `PORT`                 | Porta do servidor                        | Não         | 3001           |
| `NODE_ENV`             | Ambiente de execução                     | Não         | 'development'  |
| `JWT_SECRET`           | Chave secreta para JWT                   | Sim         | -              |
| `JWT_EXPIRES_IN`       | Tempo de expiração do token JWT          | Não         | '7d'           |
| `DB_HOST`              | Host do banco de dados                   | Não         | 'localhost'    |
| `DB_PORT`              | Porta do banco de dados                  | Não         | 3306           |
| `DB_USER`              | Usuário do banco de dados                | Sim         | -              |
| `DB_PASSWORD`          | Senha do banco de dados                  | Sim         | -              |
| `DB_NAME`              | Nome do banco de dados                   | Sim         | -              |
| `AWS_ACCESS_KEY_ID`    | AWS Access Key ID                        | Sim         | -              |
| `AWS_SECRET_ACCESS_KEY`| AWS Secret Access Key                    | Sim         | -              |
| `AWS_REGION`           | Região da AWS                           | Não         | 'us-east-1'    |
| `AWS_BUCKET`           | Nome do bucket S3                       | Sim         | -              |
| `OPENAI_API_KEY`       | Chave da API do OpenAI                  | Opcional    | -              |

## 🛠️ Comandos Disponíveis

- `pnpm dev` - Inicia o servidor em modo de desenvolvimento
- `pnpm build` - Compila o código TypeScript
- `pnpm start` - Inicia o servidor em modo de produção
- `pnpm db:push` - Executa as migrações do banco de dados
- `pnpm check` - Verifica erros de tipo TypeScript

## 🚀 Deploy no Railway

1. Instale a CLI do Railway:
   ```bash
   npm install -g @railway/cli
   ```

2. Faça login na sua conta Railway:
   ```bash
   railway login
   ```

3. Crie um novo projeto Railway:
   ```bash
   railway init
   ```

4. Adicione as variáveis de ambiente:
   ```bash
   railway env pull
   # Edite o arquivo .env com suas configurações
   railway env push
   ```

5. Faça o deploy:
   ```bash
   railway up
   ```

6. Acesse a URL fornecida pelo Railway

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
