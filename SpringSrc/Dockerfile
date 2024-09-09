# Use an OpenJDK base image
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/SpringSrc-0.0.1-SNAPSHOT.jar /app/backend-service.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "backend-service.jar"]
