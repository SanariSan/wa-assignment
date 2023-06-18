FROM nginx:stable

ARG BUILD_PATH
ENV BUILD_PATH $BUILD_PATH

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/nginxconfig.io /etc/nginx/nginxconfig.io
COPY ./docker/nginx/sites-available/_.conf /etc/nginx/sites-available/_.conf.template

RUN envsubst '$$BUILD_PATH' < /etc/nginx/sites-available/_.conf.template > /etc/nginx/sites-available/_.conf

RUN ["mkdir", "/etc/nginx/sites-enabled"]
RUN ["ln", "-s", "/etc/nginx/sites-available/_.conf", "/etc/nginx/sites-enabled/_.conf"]

CMD [\
"/bin/bash", \
"-c", \
# chown mounted static dir to avoid permissions issues
"chown -R nginx:nginx ${BUILD_PATH} ; nginx -g \"daemon off;\"" \ 
]