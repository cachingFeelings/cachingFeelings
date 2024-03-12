# Use Node.js 18 Alpine to keep the image small
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install bash
RUN apk update && apk add bash

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000 for the development server
# Note: For production, you might serve the build directory with a web server like Nginx
EXPOSE 3000

# Command to start the development server
CMD ["npm", "start"]
