# FastAPI Todo Project Prompt

Create a production-ready Todo List API using FastAPI, incorporating modern Python development practices and comprehensive testing.

## Core Requirements

### Project Structure
- Implement a well-organized project structure using Poetry for dependency management
- Create separate modules for models, schemas, database, and API routes
- Follow the repository pattern for clean separation of concerns

### API Features
- Create a RESTful API for managing todo items with CRUD operations
- Implement proper request/response validation using Pydantic models
- Add pagination for list endpoints
- Include proper error handling and status codes
- Add health check endpoint for monitoring

### Database
- Use SQLAlchemy with SQLite for data persistence
- Implement proper database connection management
- Ensure database tables are created on application startup
- Handle database migrations properly

### Testing
- Achieve high test coverage (>90%)
- Include unit tests and integration tests
- Test both success and error cases
- Use pytest fixtures for database and API client setup
- Implement proper test database isolation

### Code Quality
- Use type hints throughout the codebase
- Implement linting with ruff
- Use black for code formatting
- Follow PEP 8 style guidelines
- Add comprehensive docstrings

### CI/CD
- Set up GitHub Actions workflow for automated testing
- Run tests on multiple Python versions
- Generate and upload coverage reports to Codecov
- Add status badges to README

## Technical Specifications

### Dependencies
```toml
[tool.poetry.dependencies]
python = "^3.9"
fastapi = "^0.110.0"
uvicorn = "^0.27.1"
sqlalchemy = "^2.0.27"
pydantic = "^2.6.1"

[tool.poetry.group.dev.dependencies]
pytest = "^8.0.0"
pytest-cov = "^4.1.0"
pytest-asyncio = "^0.23.5"
httpx = "^0.26.0"
black = "^24.1.1"
ruff = "^0.2.1"
```

### API Endpoints
- `GET /health` - Health check endpoint
- `POST /api/v1/todos/` - Create a new todo
- `GET /api/v1/todos/` - List todos (with pagination)
- `GET /api/v1/todos/{todo_id}` - Get a specific todo
- `PATCH /api/v1/todos/{todo_id}` - Update a todo
- `DELETE /api/v1/todos/{todo_id}` - Delete a todo

### Data Models
```python
class Todo(SQLModel):
    id: int = Field(default=None, primary_key=True)
    title: str = Field(..., min_length=1, max_length=100)
    description: str | None = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime | None = None
```

### Project Structure
```
fastapi-todo/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── router.py
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   ├── models/
│   │   └── todo.py
│   ├── schemas/
│   │   └── todo.py
│   └── main.py
├── tests/
│   └── test_api.py
├── .github/
│   └── workflows/
│       └── test.yml
├── pyproject.toml
├── README.md
└── CONTRIBUTING.md
```

## Learning Objectives

1. **FastAPI Best Practices**
   - Proper route organization
   - Request/response validation
   - Dependency injection
   - Error handling
   - API documentation

2. **Database Management**
   - SQLAlchemy integration
   - Connection management
   - Model relationships
   - Query optimization

3. **Testing Strategies**
   - Test database setup
   - API testing with TestClient
   - Fixture management
   - Coverage reporting

4. **Development Workflow**
   - Poetry usage
   - Code formatting
   - Linting
   - Git workflow
   - CI/CD pipeline

5. **Documentation**
   - API documentation
   - Code documentation
   - Project documentation
   - Contributing guidelines

## Key Learnings and Solutions

1. **Database Initialization**
   - Create tables on application startup
   - Use proper async context managers
   - Handle database errors gracefully

2. **Test Configuration**
   - Use separate test database
   - Clean database between tests
   - Mock external dependencies
   - Handle async operations in tests

3. **CI/CD Setup**
   - Configure GitHub Actions
   - Manage secrets
   - Set up Codecov integration
   - Handle multiple Python versions

4. **Project Organization**
   - Keep files in correct directories
   - Maintain clean git history
   - Proper version control
   - Clear documentation

5. **Code Quality**
   - Consistent code style
   - Type safety
   - Error handling
   - Performance considerations

## Expected Deliverables

1. Fully functional FastAPI application
2. Comprehensive test suite with >90% coverage
3. CI/CD pipeline with GitHub Actions
4. Complete documentation
5. Clean, well-organized codebase
6. Production-ready project structure

This prompt encapsulates modern Python development practices, focusing on code quality, testing, and maintainability while building a practical REST API. 