# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos package.json e package-lock.json para o container
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Rodar o build da aplicação
RUN npm run build

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
