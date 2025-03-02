# Development Guide

This guide covers everything you need to know about developing for the FastAPI Todo project.

## Development Environment Setup

### Requirements

- Python 3.13
- Poetry
- Node.js 20+
- Docker (recommended)
- PostgreSQL (if running locally)

### Local Development Setup

#### Backend Setup

1. Install dependencies:
```bash
poetry install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Start the development server:
```bash
poetry run uvicorn app.main:app --reload --port 3000
```

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Default configuration:
# VITE_API_URL=http://localhost:3000/api/v1
```

4. Start development server:
```bash
npm run dev
```

### Docker Development Setup

1. Start the services in order:
```bash
# Start database first
docker compose up -d db
# Start development API
docker compose up -d app-dev
# Start frontend
docker compose up -d frontend
```

## Development Workflow

### Code Style and Standards

#### Backend (Python)
- Use [Black](https://github.com/psf/black) for code formatting
- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use type hints for all function parameters and return values
- Document functions and classes using docstrings

#### Frontend (TypeScript/React)
- Use ESLint and Prettier for code formatting
- Follow [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) guidelines
- Use functional components with hooks
- Implement proper error handling and loading states

### Testing

#### Backend Tests

Run tests locally:
```bash
poetry run pytest -v --cov=app
```

Run tests in Docker:
```bash
docker compose run test
```

#### Frontend Tests

Run tests locally:
```bash
cd frontend
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

### Git Workflow

1. Create a new branch for your feature/fix:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit using conventional commits:
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in API"
```

3. Push your changes and create a pull request:
```bash
git push origin feature/your-feature-name
```

### Pull Request Guidelines

1. Ensure all tests pass
2. Update documentation if needed
3. Add tests for new features
4. Follow the code style guidelines
5. Keep changes focused and atomic

## Debugging

### Backend Debugging

- Use `pytest -s` for debugging with print statements
- Use Python debugger (pdb) by adding `breakpoint()`
- Check logs in `logs/app.log`

### Frontend Debugging

- Use React Developer Tools browser extension
- Use console.log() for debugging (remove before committing)
- Check browser console for errors
- Use the Network tab to debug API calls

## Common Development Tasks

### Database Migrations

1. Create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

2. Apply migrations:
```bash
alembic upgrade head
```

### Adding Dependencies

Backend:
```bash
poetry add package-name
```

Frontend:
```bash
npm install package-name
```

### Updating Documentation

1. Update relevant markdown files in `docs/`
2. Update API documentation in code using docstrings
3. Update README.md if needed

## Troubleshooting

### Common Issues

1. Database connection issues:
   - Check PostgreSQL is running
   - Verify connection string in .env
   - Ensure migrations are up to date

2. Frontend build issues:
   - Clear node_modules and reinstall
   - Check for conflicting dependencies
   - Verify environment variables

3. Docker issues:
   - Try rebuilding images: `docker compose build --no-cache`
   - Check logs: `docker compose logs service-name`
   - Verify port mappings

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Docker Documentation](https://docs.docker.com/) 