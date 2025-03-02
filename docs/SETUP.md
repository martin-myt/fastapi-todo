# Project Setup Guide

This guide will help you set up the FastAPI Todo project for development.

## Quick Start with Docker

The fastest way to get started is using Docker:

```bash
# Clone the repository
git clone https://github.com/your-username/fastapi-todo.git
cd fastapi-todo

# Start all services
docker compose up -d
```

Visit:
- Frontend: http://localhost:5173
- API Documentation: http://localhost:3000/docs
- Backend API: http://localhost:3000/api/v1

## Manual Setup

### Prerequisites

1. Install required tools:
   - Python 3.13
   - Poetry (Python package manager)
   - Node.js 20+
   - PostgreSQL 15+
   - Docker (optional)

2. Clone the repository:
```bash
git clone https://github.com/your-username/fastapi-todo.git
cd fastapi-todo
```

### Backend Setup

1. Install Python dependencies:
```bash
poetry install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fastapi_todo
API_V1_STR=/api/v1
BACKEND_CORS_ORIGINS=["http://localhost:5173"]
```

3. Create database:
```bash
createdb fastapi_todo
```

4. Apply migrations:
```bash
poetry run alembic upgrade head
```

5. Start the backend server:
```bash
poetry run uvicorn app.main:app --reload --port 3000
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Default `.env` configuration:
```env
VITE_API_URL=http://localhost:3000/api/v1
```

4. Start the frontend development server:
```bash
npm run dev
```

## Verification

### Backend Verification

1. Check API documentation:
   - Visit http://localhost:3000/docs
   - All endpoints should be listed and interactive

2. Run backend tests:
```bash
poetry run pytest
```

### Frontend Verification

1. Run frontend tests:
```bash
cd frontend
npm test
```

2. Check the application:
   - Visit http://localhost:5173
   - Try creating, updating, and deleting todos
   - Check browser console for any errors

## Common Issues

### Backend Issues

1. Database connection errors:
   ```
   Error: could not connect to server: Connection refused
   ```
   Solution: Ensure PostgreSQL is running and credentials are correct

2. Migration errors:
   ```
   Error: Can't locate revision identified by '...'
   ```
   Solution: Delete `alembic/versions/` and recreate migrations:
   ```bash
   rm -rf alembic/versions/*
   poetry run alembic revision --autogenerate -m "initial"
   poetry run alembic upgrade head
   ```

### Frontend Issues

1. API connection errors:
   ```
   Error: Network Error
   ```
   Solution: Verify backend is running and CORS settings are correct

2. Build errors:
   ```
   Error: Cannot find module '...'
   ```
   Solution: Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Docker Setup

### Development Environment

Start services individually:
```bash
# Start database
docker compose up -d db

# Start backend
docker compose up -d app-dev

# Start frontend
docker compose up -d frontend
```

### Production Environment

Build and start production services:
```bash
docker compose -f docker-compose.prod.yml up -d
```

### Docker Troubleshooting

1. Container won't start:
   ```bash
   docker compose logs service-name
   ```

2. Reset containers and volumes:
   ```bash
   docker compose down -v
   docker compose up -d
   ```

3. Rebuild specific service:
   ```bash
   docker compose build service-name
   docker compose up -d service-name
   ```

## Next Steps

1. Read the [Development Guide](DEVELOPMENT.md) for coding standards and workflows
2. Review the [Architecture](ARCHITECTURE.md) for system design details
3. Check the [Roadmap](ROADMAP.md) for planned improvements
4. Join the community discussions in GitHub Issues 