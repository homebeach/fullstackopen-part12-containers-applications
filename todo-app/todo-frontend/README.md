# React application

This application is created with [Vite](https://vitest.dev/).

Install dependencies with `npm install`

You can run the application in development mode with `npm run dev`

You can build static files for production release with `npm run build`

## Environment variables

Use env VITE_BACKEND_URL to set where the backend for this application is

# Starting application with backend url

Start application with environment variable: `VITE_BACKEND_URL=http://localhost:3000/ npm run dev`

# Rebuild the Docker image
docker build --build-arg VITE_BACKEND_URL=http://localhost:3000 -t todo-frontend .

# Run the Docker container
docker run -p 8080:80 todo-frontend