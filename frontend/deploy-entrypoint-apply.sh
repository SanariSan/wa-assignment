#!/bin/bash

PROJECT_NAME=wa-static;

docker run --detach --rm \
-v "${PROJECT_NAME}-front-build-volume:/old-build" \
busybox sh -c "rm -rf /old-build/*";

docker run --detach --rm \
-v "$(pwd)/build-volume:/from-local-folder" \
-v "${PROJECT_NAME}-front-build-volume:/to-inside-volume" \
busybox sh -c "cp -rf /from-local-folder/* /to-inside-volume";

docker run --detach --rm \
-v "${PROJECT_NAME}-front-build-volume:/current-build" \
busybox sh -c "chown -R 101:101 /current-build";

exit;