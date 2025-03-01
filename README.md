# FastAPI Todo Application

[![codecov](https://codecov.io/gh/martin-myt/fastapi-todo/branch/main/graph/badge.svg)](https://codecov.io/gh/martin-myt/fastapi-todo)

A modern, fast, and production-ready Todo List API built with FastAPI, SQLAlchemy, and Poetry.

## Features

- RESTful API for managing todo items
- SQLite database with SQLAlchemy ORM
- Pydantic models for request/response validation
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
- Docker (optional)

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/martin-myt/fastapi-todo.git
cd fastapi-todo
```

2. Install dependencies with Poetry:
```bash
poetry install
```

### Docker Development

1. Clone the repository:
```bash
git clone https://github.com/martin-myt/fastapi-todo.git
cd fastapi-todo
```

2. Start the development server with hot reload:
```bash
docker compose up app-dev
```

## Running the Application

### Local

```bash
poetry run uvicorn app.main:app --reload
```

### Docker

Development (with hot reload):
```bash
docker compose up app-dev
```

Production:
```bash
docker compose up app
```

The API will be available at `http://localhost:8000`

## Running Tests

### Local
```bash
poetry run pytest -v --cov=app
```

### Docker
```bash
docker compose run test
```

## API Documentation

Once the application is running, you can access:
- Swagger UI documentation at `http://localhost:8000/docs`
- ReDoc documentation at `http://localhost:8000/redoc`

## Docker Commands

Build and start development server:
```bash
docker compose up app-dev --build
```

Build and start production server:
```bash
docker compose up app --build
```

Run tests in Docker:
```bash
docker compose run test
```

Stop all containers:
```bash
docker compose down
```

## License

MIT