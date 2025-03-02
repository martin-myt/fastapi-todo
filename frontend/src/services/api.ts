import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { CreateTodoDto, Todo, UpdateTodoDto, GetTodosResponse } from '../types/todo';
import { logger } from './logger';

declare global {
  interface ImportMetaEnv {
    VITE_API_URL?: string;
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/todos`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || axiosError.message;
  }
  return error instanceof Error ? error.message : String(error);
};

// Add logging interceptors
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    logger.debug('API Request', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error: AxiosError) => {
    logger.error('API Request Error', error, {
      url: error.config?.url,
      method: error.config?.method,
    });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.debug('API Response', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error: AxiosError) => {
    logger.error('API Response Error', error, {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

export const api = {
  async getTodos(skip = 0, limit = 10, paginate = false): Promise<Todo[] | GetTodosResponse> {
    try {
      logger.info('Fetching todos', { skip, limit, paginate });
      const response = await axiosInstance.get('', {
        params: { skip, limit, paginate },
      });
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error fetching todos', error as Error, { skip, limit, paginate });
      throw new Error(`Error loading todos: ${message}`);
    }
  },

  async getTodo(id: number): Promise<Todo> {
    try {
      logger.info('Fetching todo', { id });
      const response = await axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error fetching todo', error as Error, { id });
      throw new Error(`Error loading todo ${id}: ${message}`);
    }
  },

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    try {
      logger.info('Creating todo', { todo });
      const response = await axiosInstance.post('', todo);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error creating todo', error as Error, { todo });
      throw new Error(`Error creating todo: ${message}`);
    }
  },

  async updateTodo(id: number, todo: UpdateTodoDto): Promise<Todo> {
    try {
      logger.info('Updating todo', { id, todo });
      const response = await axiosInstance.put(`/${id}/`, todo);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error updating todo', error as Error, { id, todo });
      throw new Error(`Error updating todo ${id}: ${message}`);
    }
  },

  async deleteTodo(id: number): Promise<void> {
    try {
      logger.info('Deleting todo', { id });
      await axiosInstance.delete(`/${id}`);
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error deleting todo', error as Error, { id });
      throw new Error(`Error deleting todo ${id}: ${message}`);
    }
  },
}; 