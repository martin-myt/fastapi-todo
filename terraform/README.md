# Terraform Configuration for FastAPI Todo EKS Cluster

This directory contains Terraform configuration to set up an EKS cluster and supporting infrastructure in AWS.

## Prerequisites

1. AWS CLI installed and configured with appropriate credentials
2. Terraform CLI installed (version >= 1.0.0)
3. kubectl installed
4. An S3 bucket for Terraform state (you'll need to create this manually)

## Infrastructure Components

- VPC with public and private subnets
- EKS cluster (Kubernetes version 1.28)
- Managed node group with t3.medium instances
- IAM roles and policies
- Security groups
- NAT Gateway for private subnet access

## Usage

1. Create an S3 bucket for Terraform state:
```bash
aws s3 mb s3://your-terraform-state-bucket-name
```

2. Initialize Terraform with the S3 backend:
```bash
terraform init \
  -backend-config="bucket=your-terraform-state-bucket-name" \
  -backend-config="region=us-west-2"
```

3. Create a terraform.tfvars file (optional):
```hcl
aws_region  = "us-west-2"
environment = "dev"
vpc_cidr    = "10.0.0.0/16"
```

4. Plan the changes:
```bash
terraform plan
```

5. Apply the changes:
```bash
terraform apply
```

6. Configure kubectl:
```bash
aws eks update-kubeconfig --region us-west-2 --name fastapi-todo-dev
```

## Cleaning Up

To destroy all resources:
```bash
terraform destroy
```

## Important Notes

1. The cluster uses public endpoint access for simplicity. In production, you might want to disable this and use private endpoints.
2. The configuration uses a single NAT Gateway to reduce costs. For production, consider using multiple NAT Gateways for high availability.
3. The node group uses t3.medium instances. Adjust the instance type based on your needs.
4. Remember to destroy resources when not in use to avoid unnecessary costs. 