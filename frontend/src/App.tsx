import { useEffect, useState } from 'react';
import { TodoItem } from './components/TodoItem';
import { api } from './services/api';
import { CreateTodoDto, Todo, UpdateTodoDto } from './types/todo';
import { PlusIcon } from '@heroicons/react/24/outline';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await api.getTodos();
      setTodos(Array.isArray(response) ? response : response.items || []);
      setError(null);
    } catch (error: unknown) {
      setError('Failed to load todos');
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const todo: CreateTodoDto = {
        title: newTodo.title,
        description: newTodo.description || undefined,
      };
      const created = await api.createTodo(todo);
      setTodos([created, ...todos]);
      setNewTodo({ title: '', description: '' });
      setShowForm(false);
    } catch (error: unknown) {
      setError('Failed to create todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id: number, completed: boolean) => {
    try {
      const update: UpdateTodoDto = { completed };
      const updated = await api.updateTodo(id, update);
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
    } catch (error: unknown) {
      setError('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleEditTodo = async (id: number, title: string, description: string | null) => {
    try {
      const update: UpdateTodoDto = { title, description: description || undefined };
      const updated = await api.updateTodo(id, update);
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
    } catch (error: unknown) {
      setError('Failed to update todo');
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error: unknown) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Todo
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleCreateTodo} className="bg-white rounded-lg shadow p-6 mb-6">
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="input w-full mb-4"
              placeholder="What needs to be done?"
              required
            />
            <textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="input w-full mb-4"
              placeholder="Add a description (optional)"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div
              role="status"
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
            />
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No todos yet. Create one to get started!
          </div>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
