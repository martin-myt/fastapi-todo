#!/bin/bash

# Exit on error
set -e

# Check if username is provided
if [ -z "$DOCKER_USERNAME" ]; then
  echo "Error: DOCKER_USERNAME environment variable is not set"
  echo "Usage: DOCKER_USERNAME=your-username DOCKER_PASSWORD=your-password ./docker-login.sh"
  exit 1
fi

# Check if password is provided
if [ -z "$DOCKER_PASSWORD" ]; then
  echo "Error: DOCKER_PASSWORD environment variable is not set"
  echo "Usage: DOCKER_USERNAME=your-username DOCKER_PASSWORD=your-password ./docker-login.sh"
  exit 1
fi

# Login to Docker Hub
echo "Logging in to Docker Hub as $DOCKER_USERNAME..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "Successfully logged in to Docker Hub!"
echo "You can now build and push images using:"
echo "DOCKER_USERNAME=$DOCKER_USERNAME DOCKER_PUSH=true ./scripts/build-images.sh" 