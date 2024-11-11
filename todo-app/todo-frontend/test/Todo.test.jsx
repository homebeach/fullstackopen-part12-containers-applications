// test/Todo.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../src/Todos/Todo';

describe('Todo Component', () => {
  const mockTodo = { _id: '1', text: 'Test todo', done: false };
  const deleteTodo = vi.fn();  // Use vi.fn() instead of jest.fn()
  const completeTodo = vi.fn(); // Use vi.fn() instead of jest.fn()

  it('renders the todo text', () => {
    render(<Todo todo={mockTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    expect(screen.getByText(/Test todo/i)).toBeInTheDocument();
  });

  it('shows "not done" actions when todo is not complete', () => {
    render(<Todo todo={mockTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    expect(screen.getByText(/This todo is not done/i)).toBeInTheDocument();
    expect(screen.getByText(/Set as done/i)).toBeInTheDocument();
  });

  it('calls deleteTodo function when delete button is clicked', () => {
    render(<Todo todo={mockTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(deleteTodo).toHaveBeenCalledWith(mockTodo);
  });

  it('calls completeTodo function when set as done button is clicked', () => {
    render(<Todo todo={mockTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);
    fireEvent.click(screen.getByText(/Set as done/i));
    expect(completeTodo).toHaveBeenCalledWith(mockTodo);
  });
});
