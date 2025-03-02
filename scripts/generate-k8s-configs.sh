#!/bin/bash

# Exit on error
set -e

# Get the username from environment or use default
DOCKER_USERNAME=${DOCKER_USERNAME:-"your-username"}
VERSION=${VERSION:-"latest"}
ENVIRONMENT=${ENVIRONMENT:-"dev"}

echo "Generating Kubernetes configurations for $ENVIRONMENT environment"
echo "Docker username: $DOCKER_USERNAME"
echo "Version: $VERSION"

# Create a temporary directory for modified files
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Copy all k8s files to temp directory
cp -r k8s/* $TEMP_DIR/

# Replace placeholders in image patch
sed -i.bak "s/\${DOCKER_USERNAME}/$DOCKER_USERNAME/g" $TEMP_DIR/base/images-patch.yaml
sed -i.bak "s/\${VERSION}/$VERSION/g" $TEMP_DIR/base/images-patch.yaml

# Generate namespace configuration first
echo "Generating namespace configuration..."
kubectl kustomize $TEMP_DIR/overlays/$ENVIRONMENT -o $TEMP_DIR/namespace.yaml --load-restrictor LoadRestrictionsNone

# Apply namespace if it doesn't exist
echo "Ensuring namespace exists..."
kubectl apply -f $TEMP_DIR/namespace.yaml

# Generate full configuration
echo "Generating full configuration..."
kubectl kustomize $TEMP_DIR/overlays/$ENVIRONMENT > k8s/generated-$ENVIRONMENT.yaml

echo "Configuration generated: k8s/generated-$ENVIRONMENT.yaml"
echo "You can now apply the configuration with:"
echo "kubectl apply -f k8s/generated-$ENVIRONMENT.yaml" 