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

echo "Kubeconfig generated at k8s/auth/github-actions-kubeconfig.yaml"
echo ""
echo "To use this as a GitHub Actions secret, run:"
echo "cat k8s/auth/github-actions-kubeconfig.yaml | base64 -w 0"
echo ""
echo "Then add the output as a secret named KUBE_CONFIG in your GitHub repository"
