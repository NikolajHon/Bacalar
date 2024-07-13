# Указываем базовый образ с Gradle
FROM gradle:7.3.3-jdk11 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /home/app

# Копируем файлы Gradle и исходный код
COPY build.gradle settings.gradle ./
COPY src ./src

# Сборка проекта
RUN gradle build --no-daemon

# Указываем базовый образ для JRE
FROM openjdk:11-jre-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем собранный jar файл из стадии сборки
COPY --from=build /home/app/build/libs/*.jar app.jar

# Открываем порт
EXPOSE 8080

# Запуск приложения
ENTRYPOINT ["java", "-jar", "app.jar"]
