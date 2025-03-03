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
cat > k8s/auth/github-actions-kubeconfig.yaml << 'EOF'
apiVersion: v1
kind: Config
clusters:
- name: kubernetes
  cluster:
    certificate-authority-data: CLUSTER_CA_PLACEHOLDER
    server: SERVER_URL_PLACEHOLDER
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
    token: TOKEN_PLACEHOLDER
EOF

# Replace placeholders
sed -i.bak "s|CLUSTER_CA_PLACEHOLDER|${CLUSTER_CA}|" k8s/auth/github-actions-kubeconfig.yaml
sed -i.bak "s|SERVER_URL_PLACEHOLDER|${SERVER_URL}|" k8s/auth/github-actions-kubeconfig.yaml
sed -i.bak "s|TOKEN_PLACEHOLDER|${TOKEN}|" k8s/auth/github-actions-kubeconfig.yaml
rm -f k8s/auth/github-actions-kubeconfig.yaml.bak

# Validate the kubeconfig
echo "Validating kubeconfig..."
KUBECONFIG=k8s/auth/github-actions-kubeconfig.yaml kubectl config view --minify > /dev/null

echo "Kubeconfig generated at k8s/auth/github-actions-kubeconfig.yaml"
echo ""
echo "To use this as a GitHub Actions secret, run:"
echo "cat k8s/auth/github-actions-kubeconfig.yaml | tr -d '\n\r' | base64 -w 0"
echo ""
echo "Then add the output as a secret named KUBE_CONFIG in your GitHub repository"

# Optional: Show the base64 encoded config directly
echo ""
echo "Base64 encoded config:"
cat k8s/auth/github-actions-kubeconfig.yaml | tr -d '\n\r' | base64 -w 0
