import { CreateTodoDto, Todo, TodosResponse, UpdateTodoDto } from '../types/todo';

declare global {
  interface ImportMetaEnv {
    VITE_API_URL?: string;
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  async getTodos(page: number = 1, size: number = 10): Promise<TodosResponse> {
    const response = await fetch(`${API_URL}/todos/?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  async getTodo(id: number): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    return response.json();
  },

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  async updateTodo(id: number, todo: UpdateTodoDto): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
}; 