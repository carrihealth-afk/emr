FROM nginx:1.27-alpine

COPY infra/deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY apps/web/public/ /usr/share/nginx/html/

EXPOSE 8080