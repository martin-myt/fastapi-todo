import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { TodoItem } from '../components/TodoItem';
import { Todo } from '../types/todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    created_at: '2024-03-01T00:00:00.000Z',
    updated_at: '2024-03-01T00:00:00.000Z',
  };

  const mockHandlers = {
    onUpdate: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('handles todo completion toggle', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    await waitFor(() => {
      expect(mockHandlers.onUpdate).toHaveBeenCalledWith(1, true);
    });
  });

  it('handles todo deletion', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
    });
  });

  it('enters edit mode and updates todo', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Find form inputs
    const titleInput = screen.getByDisplayValue('Test Todo');
    const descriptionInput = screen.getByDisplayValue('Test Description');
    
    // Update values
    fireEvent.change(titleInput, { target: { value: 'Updated Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    
    // Submit form
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockHandlers.onEdit).toHaveBeenCalledWith(1, 'Updated Todo', 'Updated Description');
    });
  });

  it('cancels edit mode without changes', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Cancel edit
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    // Verify we're back in view mode
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(mockHandlers.onEdit).not.toHaveBeenCalled();
  });

  it('validates required fields in edit mode', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Clear title
    const titleInput = screen.getByDisplayValue('Test Todo');
    fireEvent.change(titleInput, { target: { value: '' } });
    
    // Try to save
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    // Verify the edit wasn't called
    expect(mockHandlers.onEdit).not.toHaveBeenCalled();
  });
}); 