# Architecture

This document outlines the architecture and technical decisions made in the FastAPI Todo project.

## System Overview

The FastAPI Todo application is a modern full-stack web application built with:

- Backend: FastAPI + PostgreSQL
- Frontend: React + TypeScript
- Infrastructure: Docker + Docker Compose

### High-Level Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │     │   FastAPI   │     │ PostgreSQL  │
│  Frontend   │────▶│   Backend   │────▶│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
     5173              3000/3001            5432
```

## Backend Architecture

### Technology Stack

- **FastAPI**: Modern, fast web framework for building APIs with Python
- **SQLAlchemy**: SQL toolkit and ORM
- **Alembic**: Database migration tool
- **Pydantic**: Data validation using Python type annotations
- **Poetry**: Dependency management
- **pytest**: Testing framework

### Directory Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       └── router.py
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── db/
│   │   ├── base.py
│   │   └── session.py
│   ├── models/
│   │   └── todo.py
│   └── schemas/
│       └── todo.py
├── tests/
│   ├── api/
│   └── conftest.py
└── alembic/
    └── versions/
```

### API Design

The API follows RESTful principles with versioning:

- Base URL: `/api/v1`
- Authentication: JWT-based (planned)
- Rate limiting: Per-user and per-IP (planned)

#### Endpoints

- `GET /todos`: List all todos
- `POST /todos`: Create a new todo
- `GET /todos/{id}`: Get a specific todo
- `PATCH /todos/{id}`: Update a todo
- `DELETE /todos/{id}`: Delete a todo

### Database Design

#### Todo Table

```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend Architecture

### Technology Stack

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Vitest**: Testing framework
- **React Testing Library**: Component testing
- **Axios**: HTTP client

### Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Todo/
│   ├── services/
│   │   ├── api.ts
│   │   └── logger.ts
│   ├── types/
│   │   └── todo.ts
│   ├── utils/
│   └── App.tsx
├── tests/
│   └── __tests__/
└── vite.config.ts
```

### Component Architecture

- **Atomic Design Principles**
  - Atoms: Basic UI components (Button, Input)
  - Molecules: Combinations of atoms (TodoItem)
  - Organisms: Complex UI sections (TodoList)
  - Templates: Page layouts
  - Pages: Complete views

### State Management

- Local component state using React hooks
- Context API for global state (planned)
- React Query for server state management (planned)

## Infrastructure

### Docker Configuration

Three main services:
1. Frontend (development)
2. Backend (development/production)
3. Database

#### Development Setup

```yaml
services:
  frontend:
    build:
      context: ./frontend
      target: development
    volumes:
      - ./frontend:/app
    ports:
      - "5173:5173"

  app-dev:
    build:
      context: .
      target: development
    volumes:
      - .:/app
    ports:
      - "3000:3000"

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
```

### CI/CD Pipeline

GitHub Actions workflow includes:
1. Code linting and formatting
2. Unit tests
3. Integration tests
4. Code coverage reporting
5. Docker image building
6. Deployment (planned)

## Security Considerations

### Current Implementation

- CORS configuration
- Environment variable management
- SQL injection prevention through ORM
- Input validation with Pydantic

### Planned Enhancements

- JWT authentication
- Rate limiting
- Request validation middleware
- Security headers
- HTTPS enforcement
- API key management

## Monitoring and Logging

### Current Implementation

- Structured logging with custom logger
- Request/response logging middleware
- Error tracking

### Planned Enhancements

- Metrics collection
- APM integration
- Centralized logging
- Performance monitoring
- Error reporting service integration

## Technical Decisions

### Why FastAPI?

- Modern, fast framework
- Built-in OpenAPI documentation
- Native async support
- Type safety with Pydantic
- Excellent developer experience

### Why React + TypeScript?

- Strong type system
- Better developer experience
- Improved maintainability
- Large ecosystem
- Modern tooling support

### Why PostgreSQL?

- ACID compliance
- Rich feature set
- JSON support
- Excellent performance
- Strong community support

## Future Considerations

1. **Scalability**
   - Implement caching layer
   - Add load balancing
   - Consider microservices architecture

2. **Performance**
   - Implement database indexing
   - Add API response caching
   - Optimize frontend bundle size

3. **Maintainability**
   - Improve test coverage
   - Add API versioning
   - Implement feature flags

4. **Developer Experience**
   - Add development containers
   - Improve documentation
   - Streamline local setup 