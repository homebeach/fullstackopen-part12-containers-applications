# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Nodemon globally for development
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Create a non-root user and group
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set permissions for the non-root user
RUN chown -R appuser:appuser /usr/src/app

# Switch to the non-root user
USER appuser

# Set environment variables (optional; can be overridden)
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
