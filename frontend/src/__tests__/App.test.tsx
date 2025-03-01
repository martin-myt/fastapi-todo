import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { api } from '../services/api';
import { Todo } from '../types/todo';

// Mock the API module
vi.mock('../services/api', () => ({
  api: {
    getTodos: vi.fn(),
    createTodo: vi.fn(),
    updateTodo: vi.fn(),
    deleteTodo: vi.fn(),
  },
}));

const mockTodo: Todo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  created_at: '2024-03-01T00:00:00.000Z',
  updated_at: '2024-03-01T00:00:00.000Z',
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles array response from API correctly', async () => {
    // Mock getTodos to return a delayed response
    vi.mocked(api.getTodos).mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return [mockTodo];
    });

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
      items: [mockTodo],
      total: 1,
      page: 1,
      size: 10,
    };
    vi.mocked(api.getTodos).mockResolvedValue(mockResponse);

    await act(async () => {
      render(<App />);
    });

    // Should show the todo after loading
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  });

  it('handles API error correctly', async () => {
    vi.mocked(api.getTodos).mockRejectedValue(new Error('API Error'));

    await act(async () => {
      render(<App />);
    });

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Failed to load todos')).toBeInTheDocument();
    });
  });

  it('creates a new todo successfully', async () => {
    vi.mocked(api.getTodos).mockResolvedValue([]);
    vi.mocked(api.createTodo).mockResolvedValue(mockTodo);

    await act(async () => {
      render(<App />);
    });

    // Open create form
    await act(async () => {
      fireEvent.click(screen.getByText('Add Todo'));
    });

    // Fill in the form
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
        target: { value: 'New Todo' },
      });
      fireEvent.change(screen.getByPlaceholderText('Add a description (optional)'), {
        target: { value: 'New Description' },
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create/i }));
    });

    // Verify the todo was created
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  it('handles todo creation error', async () => {
    vi.mocked(api.getTodos).mockResolvedValue([]);
    vi.mocked(api.createTodo).mockRejectedValue(new Error('Creation failed'));

    await act(async () => {
      render(<App />);
    });

    // Open create form
    await act(async () => {
      fireEvent.click(screen.getByText('Add Todo'));
    });

    // Fill in the form
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
        target: { value: 'New Todo' },
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /create/i }));
    });

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText('Failed to create todo')).toBeInTheDocument();
    });
  });

  it('updates a todo successfully', async () => {
    vi.mocked(api.getTodos).mockResolvedValue([mockTodo]);
    vi.mocked(api.updateTodo).mockImplementation(async (id, update) => ({
      ...mockTodo,
      ...update,
    }));

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    // Toggle completion
    await act(async () => {
      fireEvent.click(screen.getByRole('checkbox'));
    });

    await waitFor(() => {
      expect(api.updateTodo).toHaveBeenCalledWith(1, { completed: true });
    });
  });

  it('deletes a todo successfully', async () => {
    vi.mocked(api.getTodos).mockResolvedValue([mockTodo]);
    vi.mocked(api.deleteTodo).mockResolvedValue(undefined);

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    // Delete todo
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    });

    await waitFor(() => {
      expect(api.deleteTodo).toHaveBeenCalledWith(1);
      expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });
  });

  it('cancels todo creation', async () => {
    vi.mocked(api.getTodos).mockResolvedValue([]);

    await act(async () => {
      render(<App />);
    });

    // Open create form
    await act(async () => {
      fireEvent.click(screen.getByText('Add Todo'));
    });

    // Fill in the form
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
        target: { value: 'New Todo' },
      });
    });

    // Cancel creation
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    });

    // Verify form is closed
    expect(screen.queryByPlaceholderText('What needs to be done?')).not.toBeInTheDocument();
  });
}); 