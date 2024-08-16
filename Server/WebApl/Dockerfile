# Dockerfile для WebApl (Backend)

# Используем официальный образ OpenJDK
FROM openjdk:11-jdk-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл сборки проекта в контейнер
COPY ./target/your-application.jar /app/app.jar

# Команда запуска приложения
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
