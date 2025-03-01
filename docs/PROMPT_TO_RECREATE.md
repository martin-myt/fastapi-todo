# Full-Stack Todo Application with FastAPI and React

Create a modern, full-stack Todo application using FastAPI for the backend and React with TypeScript for the frontend. The application should follow best practices for development, testing, and deployment.

## Backend (FastAPI)

### Project Structure
```
fastapi-todo/
├── app/
│   ├── core/
│   │   ├── config.py        # Configuration settings
│   │   └── database.py      # Database connection
│   ├── models/             # SQLAlchemy models
│   ├── schemas/            # Pydantic schemas
│   ├── api/               # API routes
│   └── main.py            # FastAPI application
├── tests/                # Backend tests
└── docker-compose.yml    # Docker configuration
```

### Key Requirements
1. Use PostgreSQL for the database (not SQLite)
2. Implement proper CORS configuration to allow frontend access:
   ```python
   # app/core/config.py
   ALLOWED_ORIGINS: List[str] = [
       "http://localhost:3000",  # Dev API
       "http://localhost:3001",  # Prod API
       "http://localhost:5173"   # Frontend
   ]
   ```
3. Use different ports for development and production:
   - Development API: Port 3000
   - Production API: Port 3001
   - Database: Port 5432

4. Dependencies:
   - psycopg2-binary for PostgreSQL
   - SQLAlchemy for ORM
   - alembic for migrations

## Frontend (React + TypeScript)

### Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── TodoItem.tsx    # Todo item component
│   ├── services/
│   │   └── api.ts          # API service
│   ├── types/
│   │   └── todo.ts         # TypeScript interfaces
│   ├── __tests__/         # Frontend tests
│   └── App.tsx            # Main application
├── .env                   # Environment variables
└── package.json          # Dependencies
```

### Key Requirements
1. Environment Configuration:
   ```
   # frontend/.env
   VITE_API_URL=http://localhost:3000/api/v1
   ```

2. API Service:
   - Handle both array and paginated responses
   - Proper error handling
   - TypeScript interfaces for all API responses

3. Testing Setup:
   ```json
   // package.json dependencies
   {
     "devDependencies": {
       "@testing-library/jest-dom": "^6.1.4",
       "@testing-library/react": "^14.0.0",
       "vitest": "^0.34.6",
       "jsdom": "^22.1.0"
     }
   }
   ```

4. Test Configuration:
   ```typescript
   // vitest.config.ts
   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./src/setupTests.ts'],
     },
   });
   ```

5. Accessibility:
   - Add proper ARIA roles (e.g., role="status" for loading spinner)
   - Semantic HTML elements

## Docker Configuration

1. Use separate services for development and production:
   ```yaml
   # docker-compose.yml
   services:
     app-dev:
       ports: ["3000:8000"]
     app:
       ports: ["3001:8000"]
     frontend:
       environment:
         - VITE_API_URL=http://localhost:3000/api/v1
     db:
       ports: ["5432:5432"]
   ```

2. Start services in order:
   ```bash
   # Start database first
   docker compose up -d db
   # Start development API
   docker compose up -d app-dev
   # Start production API
   docker compose up -d app
   # Start frontend
   docker compose up -d frontend
   ```

## Testing Strategy

1. Backend Tests:
   - Unit tests for models and schemas
   - Integration tests for API endpoints
   - Use test database

2. Frontend Tests:
   - Component tests with React Testing Library
   - API response handling tests
   - Error state tests
   ```typescript
   // Example test structure
   describe('App', () => {
     it('handles array response from API correctly', async () => {
       // Test implementation
     });
     it('handles paginated response from API correctly', async () => {
       // Test implementation
     });
     it('handles API error correctly', async () => {
       // Test implementation
     });
   });
   ```

## Common Issues to Avoid

1. Database:
   - Don't use SQLite-specific options with PostgreSQL
   - Ensure proper database URL format
   - Handle database migrations properly

2. CORS:
   - Include all necessary origins in ALLOWED_ORIGINS
   - Remember to include the frontend development server

3. API Response Handling:
   - Handle both array and paginated responses
   - Proper error handling and user feedback
   - Type-safe API calls

4. Testing:
   - Install all necessary testing dependencies
   - Configure test environment properly
   - Mock API calls in frontend tests

5. Docker:
   - Use different ports for development and production
   - Start services in the correct order
   - Proper environment variable configuration
