# Use an OpenJDK base image
FROM openjdk:17

# Set the working directory
# WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar gateway.jar

# Expose the port the app runs on
# EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/gateway.jar"]
