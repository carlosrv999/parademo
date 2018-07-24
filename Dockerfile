FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /etc/nginx/html
EXPOSE 80