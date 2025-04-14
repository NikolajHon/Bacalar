FROM docker:20.10.16-cli

RUN apk add --no-cache docker-compose

# Копируем файлы
WORKDIR /app
COPY . .

# Запускаем docker-compose
CMD ["docker-compose", "up"]
