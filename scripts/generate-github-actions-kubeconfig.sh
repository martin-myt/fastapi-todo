#!/bin/bash
set -e

# Create the auth directory if it doesn't exist
mkdir -p k8s/auth

# Create namespace if it doesn't exist
echo "Creating namespace..."
kubectl create namespace fastapi-todo-dev --dry-run=client -o yaml | kubectl apply -f -

# Ensure the service account exists
echo "Creating service account..."
kubectl apply -f k8s/base/github-actions-sa.yaml

# Get Docker Desktop specific configuration
echo "Getting cluster configuration..."
CLUSTER_CA=$(kubectl config view --raw -o jsonpath='{.clusters[?(@.name=="docker-desktop")].cluster.certificate-authority-data}')
SERVER_URL="https://127.0.0.1:6443"  # Local Docker Desktop URL

if [ -z "$CLUSTER_CA" ]; then
  echo "Error: Could not find cluster CA data"
  exit 1
fi

# Create a service account token
echo "Creating service account token..."
TOKEN=$(kubectl create token github-actions -n fastapi-todo-dev)

if [ -z "$TOKEN" ]; then
  echo "Error: Could not create service account token"
  exit 1
fi

echo "Creating kubeconfig..."
cat > k8s/auth/github-actions-kubeconfig.yaml << EOF
apiVersion: v1
kind: Config
clusters:
- name: docker-desktop
  cluster:
    certificate-authority-data: ${CLUSTER_CA}
    server: ${SERVER_URL}
contexts:
- name: github-actions@docker-desktop
  context:
    cluster: docker-desktop
    namespace: fastapi-todo-dev
    user: github-actions
current-context: github-actions@docker-desktop
users:
- name: github-actions
  user:
    token: ${TOKEN}
preferences: {}
EOF

echo "Testing kubeconfig..."
export KUBECONFIG=k8s/auth/github-actions-kubeconfig.yaml

# Test service account permissions in our namespace
echo "Testing service account permissions..."
for resource in pods services deployments configmaps secrets; do
  echo "Testing access to $resource..."
  if ! kubectl auth can-i get $resource -n fastapi-todo-dev >/dev/null 2>&1; then
    echo "Error: Service account cannot access $resource"
    exit 1
  fi
done

echo "Kubeconfig validation successful!"
echo "Generating base64 encoded config..."
base64 < k8s/auth/github-actions-kubeconfig.yaml | tr -d '\n\r' > k8s/auth/kubeconfig.b64

echo "Base64 encoded config has been saved to k8s/auth/kubeconfig.b64"
echo "Content of base64 encoded config:"
cat k8s/auth/kubeconfig.b64
echo -e "\n\nCopy the above output and add it as a secret named KUBE_CONFIG in your GitHub repository"
