# Stage 1: Development image with Node.js
FROM node:18 AS dev

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Set the environment variable for the backend URL
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Expose the port for development (typically the dev server runs on port 80)
EXPOSE 80

# Start the development server
CMD ["npm", "run", "dev"]

# Stage 2: Production image with Nginx
FROM nginx:alpine AS prod

# Copy the custom NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

# Create a non-root user and group, and switch to that user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Expose the port Nginx will serve the app on
EXPOSE 80

# Copy the build output from the development stage
COPY --from=dev /app/dist /usr/share/nginx/html

# Switch to non-root user
USER appuser

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
