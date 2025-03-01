# FastAPI Todo List Application

A modern, fast, and production-ready Todo List API built with FastAPI, SQLAlchemy, and Poetry.

## Features

- RESTful API for managing todo items
- SQLite database with SQLAlchemy ORM
- Pydantic models for request/response validation
- Comprehensive test suite
- Modern dependency management with Poetry
- Code quality tools (ruff, black)
- API documentation with Swagger UI

## Requirements

- Python 3.9+
- Poetry

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fastapi-todo
```

2. Install dependencies with Poetry:
```bash
poetry install
```

## Running the Application

1. Activate the virtual environment:
```bash
poetry shell
```

2. Start the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`
API documentation (Swagger UI) will be available at `http://localhost:8000/docs`

## API Endpoints

- `POST /api/v1/todos/` - Create a new todo
- `GET /api/v1/todos/` - List all todos
- `GET /api/v1/todos/{todo_id}` - Get a specific todo
- `PATCH /api/v1/todos/{todo_id}` - Update a todo
- `DELETE /api/v1/todos/{todo_id}` - Delete a todo

## Running Tests

```bash
poetry run pytest
```

## Code Quality

Run the linter:
```bash
poetry run ruff check .
```

Format the code:
```bash
poetry run black .
```

## Project Structure

```
fastapi-todo/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── router.py
│   │   
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   │   
│   ├── models/
│   │   └── todo.py
│   │   
│   ├── schemas/
│   │   └── todo.py
│   │   
│   └── main.py
│   
├── tests/
│   └── test_api.py
│   
├── pyproject.toml
└── README.md 