# Contributing to FastAPI Todo

Thank you for your interest in contributing to FastAPI Todo! This document provides guidelines and instructions for contributing to this project.

## Development Setup

### Backend Setup

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

### Frontend Setup

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

## Development Workflow

1. Create a new branch for your feature or bugfix:
```bash
git checkout -b feature-name
```

2. Make your changes, following our coding standards:
   - Use meaningful variable and function names
   - Write docstrings and comments where necessary
   - Follow the appropriate style guidelines for each language
   - Keep functions focused and single-purpose
   - Add appropriate type annotations

3. Run tests to ensure your changes haven't broken anything:

Backend:
```bash
poetry run pytest -v --cov=app
```

Frontend:
```bash
cd frontend && npm test
```

4. Format your code:

Backend:
```bash
poetry run black .
```

Frontend:
```bash
npm run lint
```

5. Run the linters:

Backend:
```bash
poetry run ruff check .
```

Frontend:
```bash
npm run lint
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

### Backend Testing
- Write tests for all new features and bug fixes
- Maintain or improve code coverage
- Include both positive and negative test cases
- Test edge cases and error conditions
- Use meaningful test names that describe the behavior being tested

### Frontend Testing
- Write component tests using React Testing Library
- Test both success and error states
- Test loading states and user interactions
- Mock API calls appropriately
- Test accessibility features
- Ensure responsive design works correctly

## Code Style Guidelines

### Python
- Use type hints
- Follow PEP 8
- Use f-strings for string formatting
- Keep functions focused and under 50 lines where possible
- Use meaningful variable and function names

### TypeScript/React
- Use TypeScript types/interfaces
- Follow ESLint configuration
- Use functional components and hooks
- Keep components focused and reusable
- Follow React best practices
- Use proper prop types
- Handle errors gracefully

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

### CSS/Tailwind
- Follow BEM naming convention when not using Tailwind
- Keep styles modular and reusable
- Use Tailwind's utility classes effectively
- Maintain responsive design principles
- Follow accessibility guidelines

## Documentation

- Update README.md if you add new features or change existing ones
- Document API endpoints in docstrings
- Include example requests and responses
- Update requirements if you add new dependencies
- Document frontend components and hooks
- Include JSDoc comments for TypeScript functions

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
