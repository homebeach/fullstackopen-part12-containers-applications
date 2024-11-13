# Development image with Node.js
FROM node:20 AS dev

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Create a non-root user and group
RUN addgroup --system devgroup && adduser --system --ingroup devgroup devuser

# Change ownership of the application files to the devuser
RUN chown -R devuser:devgroup /app

# Set the environment variable for the backend URL
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Expose the Vite port for development
EXPOSE 5173

# Switch to the non-root user
USER devuser

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
