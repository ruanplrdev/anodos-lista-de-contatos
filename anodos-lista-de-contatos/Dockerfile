# Usar uma imagem do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Expor a porta da API
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
