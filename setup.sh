#!/bin/bash

# Cores para formatação
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Iniciando configuração do backend...${NC}"

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js não encontrado. Instalando Node.js...${NC}"
    # Instala o Node.js usando nvm (Node Version Manager)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install --lts
    nvm use --lts
fi

# Verifica se o pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}Instalando pnpm...${NC}"
    npm install -g pnpm
fi

# Instala as dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
pnpm install

# Configura o arquivo .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Criando arquivo .env...${NC}"
    cp .env.example .env
    
    # Gera uma chave secreta JWT aleatória
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    
    # Atualiza o arquivo .env com a chave secreta
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
    else
        # Linux e outros
        sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
    fi
    
    echo -e "${GREEN}Arquivo .env criado com sucesso!${NC}"
    echo -e "${YELLOW}Por favor, edite o arquivo .env com as configurações do seu banco de dados e AWS.${NC}"
else
    echo -e "${GREEN}Arquivo .env já existe.${NC}"
fi

# Configura o banco de dados
echo -e "${YELLOW}Configurando o banco de dados...${NC}"

echo -e "${YELLOW}Por favor, crie um banco de dados MySQL e atualize o arquivo .env com as credenciais.${NC}"

# Pergunta se o usuário quer executar as migrações
read -p "Deseja executar as migrações do banco de dados agora? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}Executando migrações...${NC}"
    pnpm db:push
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Migrações executadas com sucesso!${NC}"
    else
        echo -e "${YELLOW}Erro ao executar as migrações. Verifique as configurações do banco de dados.${NC}"
    fi
fi

echo -e "${GREEN}✅ Configuração concluída!${NC}"
echo -e "\nPara iniciar o servidor em modo de desenvolvimento, execute: ${YELLOW}pnpm dev${NC}"
echo -e "Para fazer o build para produção, execute: ${YELLOW}pnpm build${NC}"
echo -e "Para iniciar em produção, execute: ${YELLOW}pnpm start${NC}"
