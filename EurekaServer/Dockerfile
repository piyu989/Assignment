# Use the official OpenJDK 17 image as the base image
FROM openjdk:17.0.2-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file into the working directory
COPY target/EurekaServer-0.0.1-SNAPSHOT.jar /app/EurekaServer-0.0.1-SNAPSHOT.jar

# Expose the port your Spring Boot app is running on
EXPOSE 8761

# Run the application
CMD ["java", "-jar", "EurekaServer-0.0.1-SNAPSHOT.jar"]
