# Указываем базовый образ
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Строим приложение
RUN npm run build

# Используем Nginx для сервировки статики
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html

# Открываем порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
