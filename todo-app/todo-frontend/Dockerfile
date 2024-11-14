# Step 1: Use a Node.js image as the base for building the frontend
FROM node:20 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application source code
COPY . .

# Step 6: Set the environment variable for the backend URL
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Step 7: Run tests before building the app (optional: using vitest here)
RUN npm run test

# Step 8: Build the React application with the backend URL embedded
RUN npm run build

# Production Stage: Serve built files with NGINX
FROM nginx:alpine

# Copy the built frontend files from the build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration for production
COPY nginx.conf /etc/nginx/nginx.conf

# Create a user and group for Nginx and change ownership of Nginx directories
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
	&& chmod -R 644 /etc/nginx/nginx.conf \
	&& chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx /etc/nginx/nginx.conf

# Switch to the created non-root user
USER appuser

# Expose port 80 (standard HTTP port)
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
