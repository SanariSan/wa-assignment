#!/bin/bash

docker-compose --compatibility down > /dev/null 2>&1
docker run --detach --rm -v vhost:/vhost_og busybox sh -c "{ echo 'client_max_body_size 25m;'; } > /vhost_og/${VIRTUAL_HOST}"
docker-compose build
docker-compose -f ./docker-compose.yaml --compatibility up --detach --always-recreate-deps --force-recreate --remove-orphans

exit