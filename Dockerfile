# Estágio 1: Build da Aplicação Vite
FROM node:20-alpine AS build

WORKDIR /app

# Copia dependências e instala
COPY package*.json ./
RUN npm ci

# Copia código fonte e gera a build de produção
COPY . .
RUN npm run build

# Estágio 2: Servidor Nginx de Produção
FROM nginx:alpine

# Copia arquivo de configuração do Nginx para suporte a SPA e PWA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados pelo Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
