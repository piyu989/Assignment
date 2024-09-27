# Use the appropriate Node.js version (20.17.0)
FROM node:20.17.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 (React default)
EXPOSE 3000

# Start the React application
CMD ["npm", "run", "start"]
