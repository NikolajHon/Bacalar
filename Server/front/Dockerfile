# Dockerfile для Frontend

# Используем Node.js образ для сборки приложения
FROM node:14 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект и строим его
COPY . .
RUN npm run build

# Используем nginx для обслуживания статических файлов
FROM nginx:alpine

# Копируем статические файлы в nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
