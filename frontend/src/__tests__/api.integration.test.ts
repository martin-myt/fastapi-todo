import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import { api } from '../services/api';
import { Todo } from '../types/todo';

// Create a mock axios instance with proper types
const mockAxiosInstance = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() },
  },
})) as unknown as {
  get: Mock;
  post: Mock;
  patch: Mock;
  delete: Mock;
  interceptors: {
    request: { use: Mock };
    response: { use: Mock };
  };
};

// Mock axios.create to return our mock instance
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
    isAxiosError: vi.fn(),
  },
}));

describe('API Integration', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    created_at: '2024-03-01T00:00:00.000Z',
    updated_at: '2024-03-01T00:00:00.000Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('HTTP Methods', () => {
    it('uses GET method for fetching todos', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: [mockTodo] });
      await api.getTodos();
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('', {
        params: { skip: 0, limit: 10, paginate: false },
      });
    });

    it('uses GET method for fetching a single todo', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockTodo });
      await api.getTodo(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/1');
    });

    it('uses POST method for creating todos', async () => {
      const newTodo = { title: 'New Todo', description: 'New Description' };
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockTodo });
      await api.createTodo(newTodo);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('', newTodo);
    });

    it('uses PATCH method for updating todos', async () => {
      const update = { title: 'Updated Todo' };
      mockAxiosInstance.patch.mockResolvedValueOnce({ data: { ...mockTodo, ...update } });
      await api.updateTodo(1, update);
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/1/', update);
    });

    it('uses DELETE method for deleting todos', async () => {
      mockAxiosInstance.delete.mockResolvedValueOnce({ data: null });
      await api.deleteTodo(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/1');
    });
  });

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValueOnce(networkError);
      vi.mocked(axios.isAxiosError).mockReturnValue(false);

      await expect(api.getTodos()).rejects.toThrow('Error loading todos: Network Error');
    });

    it('handles API errors', async () => {
      const apiError = {
        isAxiosError: true,
        response: {
          data: { message: 'Invalid request' },
          status: 400,
        },
        message: 'Request failed with status code 400',
      };
      mockAxiosInstance.get.mockRejectedValueOnce(apiError);
      vi.mocked(axios.isAxiosError).mockReturnValue(true);

      await expect(api.getTodos()).rejects.toThrow('Error loading todos: Invalid request');
    });
  });

  describe('Request Configuration', () => {
    it('includes correct headers', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: [mockTodo] });
      await api.getTodos();
      
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('', {
        params: { skip: 0, limit: 10, paginate: false },
      });
    });

    it('handles trailing slashes correctly', async () => {
      mockAxiosInstance.patch.mockResolvedValueOnce({ data: mockTodo });
      await api.updateTodo(1, { title: 'Updated' });
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/1/', { title: 'Updated' });
    });
  });
}); 