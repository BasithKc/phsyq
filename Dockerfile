# Build the angular app
FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Add build timestamp to force rebuild
RUN echo "Build timestamp: $(date)" > build-time.txt
RUN npm run build

# Serve the angular app with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Create required directories and set permissions
RUN mkdir -p /tmp/nginx \
  /var/cache/nginx \
  /var/run \
  /var/log/nginx \
  /etc/nginx/conf.d \
  /etc/letsencrypt

# Set permissions for nginx directories
RUN chown -R nginx:nginx /tmp/nginx \
  /var/cache/nginx \
  /var/run \
  /var/log/nginx \
  /etc/nginx/conf.d \
  /etc/letsencrypt \
  && chmod -R 755 /tmp/nginx \
  /var/cache/nginx \
  /var/run \
  /var/log/nginx \
  /etc/nginx/conf.d \
  /etc/letsencrypt

# Copy nginx config
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY default.conf /etc/nginx/conf.d/default.conf
# RUN chown nginx:nginx /etc/nginx/conf.d/default.conf \
#   && chmod 644 /etc/nginx/conf.d/default.conf

# Copy built angular files
COPY --from=build /app/dist/phsyq/browser/ .
RUN chown -R nginx:nginx /usr/share/nginx/html \
  && chmod -R 755 /usr/share/nginx/html

# Add build info
COPY --from=build /app/build-time.txt /usr/share/nginx/html/
RUN chown nginx:nginx /usr/share/nginx/html/build-time.txt \
  && chmod 644 /usr/share/nginx/html/build-time.txt

# Create nginx pid file
RUN touch /tmp/nginx.pid \
  && chown nginx:nginx /tmp/nginx.pid \
  && chmod 644 /tmp/nginx.pid

# Modify nginx.conf to run as nginx user
# RUN sed -i 's/user  nginx;//g' /etc/nginx/nginx.conf

# Create SSL directory structure
# RUN mkdir -p /etc/letsencrypt/live/bagmytrip.in \
#   /etc/letsencrypt/archive/bagmytrip.in \
#   && chown -R nginx:nginx /etc/letsencrypt \
#   && chmod -R 755 /etc/letsencrypt

EXPOSE 80
EXPOSE 443

# Switch to non-root user
USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]