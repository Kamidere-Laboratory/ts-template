#!/usr/bin/env bash

if [[ ! -f ../.env ]]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
else
  echo "Create .env file from template"
  exit 1
fi

# Remove image to reduce dangling images
docker image rm --force $DOCKER_IMAGE:$DOCKER_IMAGE_TAG

if [[ -v NO_CACHE ]]; then
  cache="--no-cache"
fi

# Check if docker run with experimental features
# ! TODO remove check if squash is removed from experimental !
if [[ $(docker info --format='{{print .ExperimentalBuild}}') = "true" ]]; then
  squash="--squash"
fi

DOCKER_BUILDKIT=1 docker build --rm ${cache} -f $PWD/docker/Dockerfile.dev -t $DOCKER_IMAGE:$DOCKER_IMAGE_TAG ${squash} --force-rm .
