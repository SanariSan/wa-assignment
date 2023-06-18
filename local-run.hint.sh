docker build --build-arg "REACT_APP_API_URL=http://localhost" --build-arg "REACT_APP_API_VERSION=v1" -t "wa-static-front-build-img" -f ./docker/build.Dockerfile .
docker run -it --rm --name "wa-static-front-build-container" -v "wa-static-front-build-staging-volume:/home/node/proj/build" wa-static-front-build-img  
docker run -it --rm -v "wa-static-front-build-staging-volume:/staging" -v "wa-static-front-build-volume:/prod" busybox sh -c "cp -rf /staging/* /prod"