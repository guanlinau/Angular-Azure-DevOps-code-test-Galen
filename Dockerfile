# Build stage
FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy source code and build code for production
COPY ./ ./
RUN npm run build

# Running stage
FROM nginx:1.25.2-alpine
RUN mkdir -p /usr/share/nginx/html

# Create a new group and user
RUN addgroup -S frontier && adduser -S frontier -G frontier

# Change the ownership for nginx required directories and files
RUN chown -R frontier:frontier /usr/share/nginx/html \
    && chown -R frontier:frontier /var/cache/nginx \
    && chown -R frontier:frontier /var/log/nginx \
	&& chown -R frontier:frontier /etc/nginx/conf.d

# Allow nginx to write to the pid directory
RUN touch /var/run/nginx.pid && \
        chown -R frontier:frontier /var/run/nginx.pid

# Switch to the new user
USER frontier

# Expose the running port
EXPOSE 80

# Copy the files from the build stage
COPY --from=builder --chown=frontier:frontier app/dist/angular11-testing-examples /usr/share/nginx/html

# Start nginx
CMD ["nginx","-g", "daemon off;"]
