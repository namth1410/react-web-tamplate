# Use the official Node.js runtime as the base image
FROM node:20.14.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --ignore-scripts

COPY ./src ./src
COPY ./public ./public
COPY tsconfig.json ./

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginxinc/nginx-unprivileged:stable-alpine3.19-slim
COPY --from=build --chown=101:101 /app/build /usr/share/nginx/html
COPY ./rootfs /