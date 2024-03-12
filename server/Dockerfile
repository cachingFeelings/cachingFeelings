# Use Node.js 18 Alpine for a lightweight image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install bash for better shell scripting support
RUN apk update && apk add bash

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including nodemon for development
RUN npm install && npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app using nodemon
CMD ["npm", "run", "dev"]