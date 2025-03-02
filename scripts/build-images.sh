#!/bin/bash

# Exit on error
set -e

# Get the username from environment or use default
DOCKER_USERNAME=${DOCKER_USERNAME:-"your-username"}
VERSION=${VERSION:-"latest"}

echo "Building images for $DOCKER_USERNAME/fastapi-todo"
echo "Version: $VERSION"

# Build API image
echo "Building API image..."
docker build -t $DOCKER_USERNAME/fastapi-todo-api:$VERSION \
  -f Dockerfile .

# Build frontend image
echo "Building frontend image..."
cd frontend && docker build -t $DOCKER_USERNAME/fastapi-todo-frontend:$VERSION \
  -f Dockerfile .

echo "Images built successfully:"
echo "- $DOCKER_USERNAME/fastapi-todo-api:$VERSION"
echo "- $DOCKER_USERNAME/fastapi-todo-frontend:$VERSION"

# If DOCKER_PUSH is set to true, push the images
if [ "${DOCKER_PUSH}" = "true" ]; then
  echo "Pushing images to Docker Hub..."
  docker push $DOCKER_USERNAME/fastapi-todo-api:$VERSION
  docker push $DOCKER_USERNAME/fastapi-todo-frontend:$VERSION
  echo "Images pushed successfully!"
fi 