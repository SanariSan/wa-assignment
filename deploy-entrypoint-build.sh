#!/bin/bash

cp ./prod.env ./.env
docker container rm -f $(docker ps -a -q --no-trunc --filter name=^/wa-static-front-build-container$) > /dev/null 2>&1
docker run --detach --rm -v "wa-static-front-build-staging-volume:/data" busybox sh -c "rm -rf /data/*"
# docker run --detach --rm -v "wa-static-assets-volume:/assets_to" -v "/$(pwd)/assets:/assets_from" busybox sh -c "cp -rf /assets_from/* /assets_to"
docker build --build-arg "REACT_APP_API_URL=${REACT_APP_API_URL}" -t "wa-static-front-build-img" -f ./docker/build.Dockerfile .
docker run --detach --rm --name "wa-static-front-build-container" -v "wa-static-front-build-staging-volume:/home/node/proj/build" wa-static-front-build-img
sleep 1

if [ "$(docker ps -aqf "name=wa-static-front-build-container")" ]; then 
    while docker inspect wa-static-front-build-container >/dev/null 2>&1; do 
        echo "Waiting for build to finish...";
        sleep 5; 
    done;
    echo "Build completed (unknown if failed or succeeded)";
    docker run --detach --rm -v "wa-static-front-build-staging-volume:/staging" -v "wa-static-front-build-volume:/prod" busybox sh -c "cp -rf /staging/* /prod";
    echo "Applied staging build to production volume";
fi

exit