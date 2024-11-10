# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a non-root user and group, then set permissions
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /usr/src/app

# Switch to the non-root user
USER appuser

# Set environment variables (optional; can be overridden)
ENV PORT=3000
# MongoDB and Redis URLs can be configured here, or better passed as environment variables during deployment
# ENV MONGO_URL=your_mongo_url_here
# ENV REDIS_URL=your_redis_url_here

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
