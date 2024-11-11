# Step 1: Use a Node.js image as the base for building the frontend
FROM node:18 AS build

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

# Step 7: Build the React application with the backend URL embedded
RUN npm run build

# Step 8: Use a lightweight web server to serve the static files
FROM nginx:alpine

# Step 9: Create a non-root user and group, and switch to that user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Step 10: Copy the custom NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

# Step 11: Adjust permissions on the NGINX config directory and files
RUN chmod -R 644 /etc/nginx/nginx.conf && \
	chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx /etc/nginx/nginx.conf

# Step 12: Copy the built files from the previous stage to the nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Step 13: Switch to non-root user
USER appuser

# Step 14: Expose port 80 for accessing the application
EXPOSE 80

# Step 15: Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
