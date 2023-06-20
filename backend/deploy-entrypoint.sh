#!/bin/bash

PROJECT_NAME=wa-static;

cp ./prod.env ./.env;

# docker run --detach --rm \
#  -v "${PROJECT_NAME}-assets-volume:/assets_to" \
#  -v "/$(pwd)/assets:/assets_from" \
#  busybox sh -c "cp -rf /assets_from/* /assets_to"

docker-compose --compatibility down > /dev/null 2>&1;

docker run --detach --rm \
-v "vhost:/vhost-mounted" \
busybox sh -c "{ echo 'client_max_body_size 25m;'; } > /vhost-mounted/${VIRTUAL_HOST}";

docker-compose build;

docker-compose -f ./docker-compose.yaml --compatibility up \
--detach --always-recreate-deps --force-recreate --remove-orphans;

exit;