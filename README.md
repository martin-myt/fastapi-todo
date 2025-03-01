# FastAPI Todo Application

[![codecov](https://codecov.io/gh/martin-myt/fastapi-todo/branch/main/graph/badge.svg)](https://codecov.io/gh/martin-myt/fastapi-todo)

A modern, fast, and production-ready Todo List API built with FastAPI, SQLAlchemy, and Poetry, with a React frontend.

## Features

- RESTful API for managing todo items
- SQLite database with SQLAlchemy ORM
- Pydantic models for request/response validation
- Modern React frontend with TypeScript
- Tailwind CSS for styling
- Comprehensive test suite
- Modern dependency management with Poetry
- Code quality tools (ruff, black)
- API documentation with Swagger UI
- GitHub Actions CI/CD pipeline
- Code coverage reporting with Codecov
- Docker support for development and production

## Requirements

- Python 3.13
- Poetry
- Node.js 20+ (for frontend)
- Docker (optional)

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

### Docker Development

1. Clone the repository:
```bash
git clone https://github.com/martin-myt/fastapi-todo.git
cd fastapi-todo
```

2. Start both backend and frontend with hot reload:
```bash
docker compose up app-dev frontend
```

## Running the Application

### Local Development

Backend:
```bash
poetry run uvicorn app.main:app --reload
```

Frontend:
```bash
cd frontend
npm run dev
```

### Docker

Development (with hot reload):
```bash
docker compose up app-dev frontend
```

Production:
```bash
docker compose up app
```

The API will be available at `http://localhost:8000`
The frontend will be available at `http://localhost:5173`

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

```bash
cd frontend
npm test
```

## API Documentation

Once the application is running, you can access:
- Swagger UI documentation at `http://localhost:8000/docs`
- ReDoc documentation at `http://localhost:8000/redoc`

## Docker Commands

Build and start development server with frontend:
```bash
docker compose up app-dev frontend --build
```

Build and start production server:
```bash
docker compose up app --build
```

Run backend tests in Docker:
```bash
docker compose run test
```

Stop all containers:
```bash
docker compose down
```

## License

MIT