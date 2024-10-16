# Базовый образ для Node.js
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех файлов проекта
COPY . .

# Сборка приложения
RUN npm run build

# Установка сервера для обслуживания статических файлов
RUN npm install -g serve

# Экспонирование порта приложения
EXPOSE 3000

# Запуск фронтенда
CMD ["serve", "-s", "build", "-l", "3000"]
