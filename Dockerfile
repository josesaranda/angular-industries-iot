# Start with the official Node.js image
FROM node:latest AS build

# Set the working directory to /app
WORKDIR /app

# Copy application code to the container
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Start with the official nginx image
FROM nginx

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the contents of the dist directory into the nginx html directory
COPY --from=build /app/dist/industries-iot /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80
