import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';
import { useState, FormEvent, ChangeEvent } from 'react';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, description: string | null) => void;
}

export function TodoItem({ todo, onUpdate, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(todo.id, title, description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow mb-4">
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="input w-full mb-2"
          placeholder="Todo title"
          required
        />
        <textarea
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          className="input w-full mb-4"
          placeholder="Description (optional)"
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`mt-1 text-gray-600 ${todo.completed ? 'line-through' : ''}`}>
              {todo.description}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(todo.created_at).toLocaleDateString()}
            {todo.updated_at && ` • Updated: ${new Date(todo.updated_at).toLocaleDateString()}`}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onUpdate(todo.id, !todo.completed)}
            className={`p-1 rounded-full ${
              todo.completed ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            {todo.completed ? (
              <CheckCircleIcon className="h-6 w-6" />
            ) : (
              <XCircleIcon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded-full text-blue-600 hover:text-blue-700"
          >
            <PencilIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 rounded-full text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
} 