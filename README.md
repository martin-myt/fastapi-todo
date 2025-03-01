# FastAPI Todo Application

[![codecov](https://codecov.io/gh/martin-myt/fastapi-todo/branch/main/graph/badge.svg)](https://codecov.io/gh/martin-myt/fastapi-todo)

A modern, fast, and production-ready Todo List application built with FastAPI and React. The backend uses FastAPI, SQLAlchemy, and Poetry, while the frontend is built with React, TypeScript, and Tailwind CSS.

## Features

Backend:
- RESTful API for managing todo items
- PostgreSQL database with SQLAlchemy ORM
- Pydantic models for request/response validation
- Comprehensive test suite
- Modern dependency management with Poetry
- Code quality tools (ruff, black)
- API documentation with Swagger UI
- GitHub Actions CI/CD pipeline
- Code coverage reporting with Codecov

Frontend:
- Modern React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Testing Library for component testing
- Vitest for unit testing
- Proper error handling and loading states
- Responsive design
- Accessibility features

Development:
- Docker support for development and production
- Hot reload for both frontend and backend
- Comprehensive test coverage
- Environment-specific configurations

## Requirements

- Python 3.13
- Poetry
- Node.js 20+
- Docker (optional)
- PostgreSQL (if running locally)

## Installation

### Backend Development

1. Clone the repository:
```bash
git clone https://github.com/martin-myt/fastapi-todo.git
cd fastapi-todo
```

2. Install dependencies with Poetry:
```bash
poetry install
```

### Frontend Development

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
echo "VITE_API_URL=http://localhost:3000/api/v1" > .env
```

### Docker Development

1. Clone the repository:
```bash
git clone https://github.com/martin-myt/fastapi-todo.git
cd fastapi-todo
```

2. Start the services in order:
```bash
# Start database first
docker compose up -d db
# Start development API
docker compose up -d app-dev
# Start frontend
docker compose up -d frontend
```

## Running the Application

### Local Development

Backend:
```bash
poetry run uvicorn app.main:app --reload --port 3000
```

Frontend:
```bash
cd frontend
npm run dev
```

### Docker

Development (with hot reload):
```bash
docker compose up -d db app-dev frontend
```

Production:
```bash
docker compose up -d db app frontend
```

Access points:
- Development API: `http://localhost:3000/api/v1`
- Production API: `http://localhost:3001/api/v1`
- Frontend: `http://localhost:5173`
- Database: `localhost:5432`

## Running Tests

### Backend Tests

Local:
```bash
poetry run pytest -v --cov=app
```

Docker:
```bash
docker compose run test
```

### Frontend Tests

Local:
```bash
cd frontend
npm test
```

Watch mode:
```bash
npm test -- --watch
```

## API Documentation

Once the application is running, you can access:
- Development API Swagger UI: `http://localhost:3000/docs`
- Production API Swagger UI: `http://localhost:3001/docs`
- Development API ReDoc: `http://localhost:3000/redoc`
- Production API ReDoc: `http://localhost:3001/redoc`

## Docker Commands

Build and start all services:
```bash
docker compose up -d
```

Build and start development environment:
```bash
docker compose up -d db app-dev frontend
```

Build and start production environment:
```bash
docker compose up -d db app
```

Run backend tests:
```bash
docker compose run test
```

Stop all containers:
```bash
docker compose down
```

## License

MIT