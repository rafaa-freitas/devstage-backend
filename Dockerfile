# Usar uma imagem oficial do Node.js como base
FROM node:22.14-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json (ou yarn.lock) para instalar as dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install --frozen-lockfile

# Copiar o código-fonte para o contêiner
COPY . .

# Construir o projeto, já que você usa o script de build "tsup-node"
RUN npm run build

# Expor a porta que a aplicação irá rodar
EXPOSE 3333

# Definir o comando para rodar o servidor (vai rodar o "dev" caso esteja no modo desenvolvimento)
CMD ["npm", "run", "dev"]
