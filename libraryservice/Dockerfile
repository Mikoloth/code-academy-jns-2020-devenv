FROM maven:3-jdk-14 as build
WORKDIR /usr/src/mymaven
COPY . /usr/src/mymaven
RUN mvn package -DskipTests

FROM openjdk:14-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/mymaven/target/demo-*.jar /usr/src/app/demo.jar

CMD ["java", "-jar", "/usr/src/app/demo.jar"]