import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { api } from '../services/api';

// Mock the API module
vi.mock('../services/api', () => ({
  api: {
    getTodos: vi.fn(),
    createTodo: vi.fn(),
    updateTodo: vi.fn(),
    deleteTodo: vi.fn(),
  },
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles array response from API correctly', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo', description: 'Test Description', completed: false },
    ];
    vi.mocked(api.getTodos).mockResolvedValue(mockTodos);

    render(<App />);

    // Should show loading initially
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Should show the todo after loading
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  });

  it('handles paginated response from API correctly', async () => {
    const mockResponse = {
      items: [
        { id: 1, title: 'Test Todo', description: 'Test Description', completed: false },
      ],
      total: 1,
      page: 1,
    };
    vi.mocked(api.getTodos).mockResolvedValue(mockResponse);

    render(<App />);

    // Should show the todo after loading
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  });

  it('handles API error correctly', async () => {
    vi.mocked(api.getTodos).mockRejectedValue(new Error('API Error'));

    render(<App />);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Failed to load todos')).toBeInTheDocument();
    });
  });
}); 