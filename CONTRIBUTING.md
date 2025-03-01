# Contributing to FastAPI Todo

Thank you for your interest in contributing to FastAPI Todo! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. Fork the repository and clone your fork:
```bash
git clone https://github.com/your-username/fastapi-todo.git
cd fastapi-todo
```

2. Install Poetry (if you haven't already):
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

3. Install dependencies:
```bash
poetry install
```

4. Activate the virtual environment:
```bash
poetry shell
```

## Development Workflow

1. Create a new branch for your feature or bugfix:
```bash
git checkout -b feature-name
```

2. Make your changes, following our coding standards:
   - Use meaningful variable and function names
   - Write docstrings for functions and classes
   - Follow PEP 8 style guidelines
   - Keep functions focused and single-purpose
   - Add type hints to function parameters and return values

3. Run tests to ensure your changes haven't broken anything:
```bash
poetry run pytest -v --cov=app
```

4. Format your code:
```bash
poetry run black .
```

5. Run the linter:
```bash
poetry run ruff check .
```

6. Commit your changes:
```bash
git add .
git commit -m "Description of changes"
```

## Pull Request Process

1. Update your fork to include the latest changes from the main repository:
```bash
git remote add upstream https://github.com/martin-myt/fastapi-todo.git
git fetch upstream
git rebase upstream/main
```

2. Push your changes to your fork:
```bash
git push origin feature-name
```

3. Create a Pull Request through GitHub with:
   - A clear title and description
   - Reference to any related issues
   - Screenshots if the changes affect the UI
   - Notes about any breaking changes

4. Wait for review. The maintainers will review your PR and might request changes.

## Testing Guidelines

- Write tests for all new features and bug fixes
- Maintain or improve code coverage
- Include both positive and negative test cases
- Test edge cases and error conditions
- Use meaningful test names that describe the behavior being tested

## Code Style Guidelines

### Python
- Use type hints
- Follow PEP 8
- Use f-strings for string formatting
- Keep functions focused and under 50 lines where possible
- Use meaningful variable and function names

### FastAPI
- Use Pydantic models for request/response validation
- Include comprehensive API documentation
- Follow REST principles
- Handle errors gracefully with appropriate status codes

### Database
- Use SQLAlchemy models for database operations
- Include database migrations for schema changes
- Write efficient queries
- Handle database errors appropriately

## Documentation

- Update README.md if you add new features or change existing ones
- Document API endpoints in docstrings
- Include example requests and responses
- Update requirements if you add new dependencies

## Questions or Problems?

- Open an issue for bugs or feature requests
- Ask questions in the discussions section
- Contact the maintainers for security issues

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Report inappropriate behavior to maintainers

Thank you for contributing to FastAPI Todo!
