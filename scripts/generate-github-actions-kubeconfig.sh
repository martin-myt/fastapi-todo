#!/bin/bash
set -e

# Create the auth directory if it doesn't exist
mkdir -p k8s/auth

# Ensure the service account exists
if ! kubectl get serviceaccount github-actions -n fastapi-todo-dev &>/dev/null; then
  echo "Creating service account..."
  kubectl apply -f k8s/base/github-actions-sa.yaml
fi

# Get the cluster CA certificate
CLUSTER_CA=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.certificate-authority-data}')
SERVER_URL=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}')

# Create a service account token
TOKEN=$(kubectl create token github-actions -n fastapi-todo-dev)

# Create the kubeconfig file
cat > k8s/auth/github-actions-kubeconfig.yaml << EOF
apiVersion: v1
kind: Config
clusters:
- name: kubernetes
  cluster:
    certificate-authority-data: ${CLUSTER_CA}
    server: ${SERVER_URL}
contexts:
- name: github-actions@kubernetes
  context:
    cluster: kubernetes
    namespace: fastapi-todo-dev
    user: github-actions
current-context: github-actions@kubernetes
users:
- name: github-actions
  user:
    token: ${TOKEN}
EOF

# Validate the kubeconfig
echo "Validating kubeconfig..."
if KUBECONFIG=k8s/auth/github-actions-kubeconfig.yaml kubectl cluster-info >/dev/null 2>&1; then
  echo "Kubeconfig validation successful!"
else
  echo "Error: Kubeconfig validation failed!"
  exit 1
fi

echo "Kubeconfig generated at k8s/auth/github-actions-kubeconfig.yaml"
echo ""
echo "To use this as a GitHub Actions secret, run:"
echo "cat k8s/auth/github-actions-kubeconfig.yaml | base64 | tr -d '\n\r' > k8s/auth/kubeconfig.b64"
echo "cat k8s/auth/kubeconfig.b64 # Copy this output as your GitHub secret"
echo ""

# Generate the base64 encoded config
base64 < k8s/auth/github-actions-kubeconfig.yaml | tr -d '\n\r' > k8s/auth/kubeconfig.b64
echo "Base64 encoded config has been saved to k8s/auth/kubeconfig.b64"
echo "Content of base64 encoded config:"
cat k8s/auth/kubeconfig.b64
