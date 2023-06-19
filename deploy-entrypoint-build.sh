#!/bin/bash

cp ./prod.env ./.env;

# local only
# docker container rm \
#  -f $(docker ps -a -q --no-trunc --filter name=^/wa-static-front-build-container$) > /dev/null 2>&1;

# local only
# docker run --detach --rm \
#  -v "wa-static-front-build-volume:/data" busybox sh \
#  -c "rm -rf /data/*";

docker build \
--build-arg "REACT_APP_API_URL=${REACT_APP_API_URL}" \
-t "wa-static-front-build-img" \
-f ./docker/build.Dockerfile .;

docker run --detach --rm \
--name "wa-static-front-build-container" \
-v "wa-static-front-build-volume:/home/node/proj/build" \
wa-static-front-build-img;

sleep 1;

if [ "$(docker ps -aqf "name=wa-static-front-build-container")" ]; then 
    while docker inspect wa-static-front-build-container >/dev/null 2>&1; do 
        echo "Waiting for build to finish...";
        sleep 5; 
    done;
    echo "Build completed (unknown if failed or succeeded)";

    docker run --detach --rm \
    -v "wa-static-front-build-volume:/from-inside-volume" \
    -v "$(pwd)/build-volume:/to-local-folder" busybox sh \
    -c "cp -rf /from-inside-volume/* /to-local-folder";
    echo "Pulled files from volume to local folder (./build-volume)";
fi

exit;