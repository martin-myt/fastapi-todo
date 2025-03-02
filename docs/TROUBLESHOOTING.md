# Troubleshooting Guide

This guide combines our practical experience and learnings to help you diagnose and resolve common issues.

## Quick Reference

### Common Issues by Category

#### Environment Setup
- ❌ esbuild version mismatch
- ❌ Database connection failures
- ❌ CORS configuration issues
- ❌ Environment variable problems

#### Docker
- ❌ Volume mount issues
- ❌ Container startup failures
- ❌ Hot reload not working
- ❌ Port conflicts

#### Development
- ❌ TypeScript type errors
- ❌ API integration issues
- ❌ Test failures
- ❌ Linting errors

## Systematic Troubleshooting Approach

### 1. Initial Assessment

Before making any changes:
1. Document the current state
2. Define expected behavior
3. Gather relevant logs
4. Check environment specifics

### 2. Gathering Information

#### Project Structure
```bash
# Check current directory structure
ls -R

# Verify file locations
find . -name "filename"

# Check Git status
git status
```

#### Environment
```bash
# Check environment variables
env | grep VITE_
env | grep FASTAPI

# Verify Docker state
docker compose ps
docker compose logs service-name
```

#### Dependencies
```bash
# Check Node.js dependencies
npm list | grep package-name

# Check Python dependencies
poetry show
```

## Common Issues and Solutions

### Frontend Issues

#### esbuild Version Mismatch

**Symptoms:**
- Error about host version not matching binary version
- Build failures with esbuild-related errors

**Solutions:**
1. Check versions:
   ```bash
   npm list | grep esbuild
   ```
2. Clean installation:
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```
3. Update Dockerfile:
   ```dockerfile
   # Use Node.js 18 for better compatibility
   FROM node:18-alpine
   
   # Clean npm cache before install
   RUN npm cache clean --force
   ```

#### CORS Errors

**Symptoms:**
- Browser console shows CORS policy errors
- API requests fail with CORS errors

**Solutions:**
1. Verify CORS settings in `backend/app/main.py`
2. Check frontend API URL configuration
3. Ensure proper headers in API requests

### Backend Issues

#### Database Connection

**Symptoms:**
- "Connection refused" errors
- Timeout errors when accessing database

**Solutions:**
1. Check database service:
   ```bash
   docker compose ps db
   ```
2. Verify connection string:
   ```bash
   # Check .env file
   cat .env | grep DATABASE_URL
   ```
3. Test database connection:
   ```bash
   docker compose exec db psql -U postgres
   ```

#### Migration Issues

**Symptoms:**
- "Can't locate revision" errors
- Table doesn't exist errors

**Solutions:**
1. Reset migrations:
   ```bash
   rm -rf alembic/versions/*
   poetry run alembic revision --autogenerate -m "initial"
   poetry run alembic upgrade head
   ```
2. Verify database state:
   ```bash
   poetry run alembic current
   ```

### Docker Issues

#### Volume Mounts

**Symptoms:**
- Changes not reflecting in container
- Permission denied errors
- Missing files in container

**Solutions:**
1. Check volume configuration:
   ```bash
   docker compose config
   ```
2. Verify file ownership:
   ```bash
   docker compose exec service-name ls -la /app
   ```
3. Reset volumes:
   ```bash
   docker compose down -v
   docker compose up -d
   ```

#### Container Startup

**Symptoms:**
- Container exits immediately
- Service unavailable
- Health check failures

**Solutions:**
1. Check logs:
   ```bash
   docker compose logs service-name
   ```
2. Verify configuration:
   ```bash
   docker compose config service-name
   ```
3. Rebuild service:
   ```bash
   docker compose build --no-cache service-name
   ```

## Best Practices

### Documentation

1. **Keep a Change Log**
   - Document significant changes
   - Include rationale
   - Note limitations

2. **Environment Setup**
   - Document required variables
   - List dependency versions
   - Include setup steps

3. **Testing**
   - Run tests in isolation
   - Check logs thoroughly
   - Verify in multiple environments

### Development Workflow

1. **Making Changes**
   - One change at a time
   - Document each change
   - Verify impact
   - Keep track of attempts

2. **Version Control**
   - Use descriptive branches
   - Write clear commit messages
   - Reference issues

3. **Code Quality**
   - Run linters
   - Follow style guides
   - Write tests

## Getting Help

1. Check existing documentation:
   - [Development Guide](DEVELOPMENT.md)
   - [Architecture](ARCHITECTURE.md)
   - [Setup Guide](SETUP.md)

2. Search GitHub Issues

3. Contact maintainers:
   - Open a new issue
   - Join discussions
   - Follow contribution guidelines 