# Frontend

This is the frontend application for the FastAPI Todo project, built with React, TypeScript, and Vite.

## Features

- Modern React application with TypeScript
- Vite for fast development and building
- Comprehensive test suite using Vitest
- Integrated logging with loglevel
- Axios for API communication

## Testing

The application includes several types of tests:

### Integration Tests

Located in `src/__tests__/api.integration.test.ts`, these tests verify:
- HTTP method usage for CRUD operations
- Error handling for network and API errors
- Request configuration and headers
- API endpoint behavior

### Component Tests

- `src/__tests__/App.test.tsx`: Tests the main App component functionality
- `src/__tests__/TodoItem.test.tsx`: Tests individual todo item rendering and interactions

### Test Coverage

Run tests with coverage reporting:
```bash
npm test -- --coverage
```

## Logging

The application uses `loglevel` for logging with different levels:
- DEBUG: API requests and responses
- INFO: User actions and operations
- ERROR: Failed operations and error details

Logs include:
- Timestamps
- Log levels
- Operation context
- Error details when applicable

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

## Environment Variables

- `VITE_API_URL`: API base URL (defaults to http://localhost:3000/api/v1)
