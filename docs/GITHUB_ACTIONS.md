# GitHub Actions Setup

This document explains how to set up GitHub Actions for automated building, pushing, and deploying of the FastAPI Todo application.

## Required Secrets

The following secrets need to be configured in your GitHub repository:

### Docker Hub Credentials
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

### Kubernetes Configuration
- `KUBE_CONFIG`: Base64-encoded kubeconfig file for your Kubernetes cluster

## Setting Up Secrets

1. **Generate Docker Hub Access Token**:
   - Log in to [Docker Hub](https://hub.docker.com)
   - Go to Account Settings > Security
   - Click "New Access Token"
   - Give it a descriptive name (e.g., "GitHub Actions")
   - Copy the generated token

2. **Encode Kubeconfig**:
   ```bash
   cat ~/.kube/config | base64
   ```

3. **Add Secrets to GitHub**:
   - Go to your repository on GitHub
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Add each secret with its corresponding value

## Workflow Details

The GitHub Actions workflow (`build-and-deploy.yaml`) includes:

### Build Job
- Triggers on:
  - Push to main branch
  - New version tags (v*)
  - Pull requests to main
- Builds Docker images using BuildX
- Caches layers for faster builds
- Pushes images to Docker Hub (except for PRs)

### Deploy Job
- Runs after successful build
- Only runs on push to main or tags
- Sets up kubectl and kustomize
- Generates environment-specific configurations
- Deploys to Kubernetes
- Verifies deployment success

## Version Tagging

Images are tagged based on the trigger:
- Git tags (v*) → Use version number
- Push to main → Use 'latest'
- Other branches → Use short commit SHA

## Environment Configuration

The workflow uses a 'development' environment with:
- Namespace: fastapi-todo-dev
- Resource limits defined in kustomization
- Environment-specific configurations

## Monitoring Deployments

1. **Check Workflow Status**:
   - Go to Actions tab in your repository
   - Click on the latest workflow run

2. **View Deployment Details**:
   ```bash
   kubectl get all -n fastapi-todo-dev
   kubectl get pods -n fastapi-todo-dev
   kubectl logs -n fastapi-todo-dev deployment/api
   kubectl logs -n fastapi-todo-dev deployment/frontend
   ```

## Troubleshooting

### Common Issues

1. **Docker Push Fails**:
   - Verify Docker Hub credentials
   - Check repository permissions
   - Ensure image names are correct

2. **Kubernetes Deployment Fails**:
   - Verify KUBE_CONFIG is correct
   - Check cluster connectivity
   - Verify namespace exists
   - Check pod logs for errors

3. **Build Failures**:
   - Check Dockerfile syntax
   - Verify build context
   - Review build logs in GitHub Actions

## Security Notes

- Use Docker Hub access tokens instead of password
- Regularly rotate access tokens
- Limit Kubernetes service account permissions
- Keep kubeconfig credentials secure
- Review workflow permissions regularly 