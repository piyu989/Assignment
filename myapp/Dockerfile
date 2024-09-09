FROM node:alpine AS development

# Copy the package.json and package-lock.json files to the root directory of the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the root directory of the container
COPY . .

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
