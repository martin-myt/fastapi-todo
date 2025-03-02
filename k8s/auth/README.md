# Kubernetes Authentication

This directory contains authentication-related files for Kubernetes deployments.

## GitHub Actions Kubeconfig

The `github-actions-kubeconfig.yaml` file is used by GitHub Actions to deploy to your Kubernetes cluster. This file contains sensitive information and should never be committed to the repository.

### Generating the Kubeconfig

1. Ensure the service account exists:
```bash
kubectl get serviceaccount github-actions -n fastapi-todo-dev
```

2. Get the cluster CA certificate:
```bash
kubectl config view --minify -o jsonpath='{.clusters[0].cluster.certificate-authority-data}'
```

3. Create a service account token:
```bash
kubectl create token github-actions -n fastapi-todo-dev
```

4. Create the kubeconfig file:
```yaml
apiVersion: v1
kind: Config
clusters:
- name: docker-desktop
  cluster:
    certificate-authority-data: [CLUSTER_CA_DATA]
    server: https://127.0.0.1:6443
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
    token: [SERVICE_ACCOUNT_TOKEN]
```

5. Replace:
   - `[CLUSTER_CA_DATA]` with the output from step 2
   - `[SERVICE_ACCOUNT_TOKEN]` with the output from step 3

6. Base64 encode the file for GitHub Actions:
```bash
cat github-actions-kubeconfig.yaml | base64
```

7. Add the base64-encoded output as a GitHub Actions secret named `KUBE_CONFIG`

### Security Notes

1. The kubeconfig file contains sensitive information and should never be committed to the repository
2. Regularly rotate the service account token for security
3. The service account has limited permissions within the `fastapi-todo-dev` namespace only
4. If the cluster configuration changes, you'll need to regenerate this file 