
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
COPY src ./src

RUN ./gradlew build -x test --no-daemon


EXPOSE 8080

CMD ["java", "-jar", "build/libs/WebApl-0.0.1-SNAPSHOT.jar"]
