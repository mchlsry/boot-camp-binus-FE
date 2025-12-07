import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';

const sampleTask = {
  id: '1',
  title: 'Test Task',
  notes: 'Catatan',
  completed: false,
  createdAt: Date.now(),
};

test('renders TaskItem and triggers events', () => {
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  render(<TaskItem task={sampleTask} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />);

  expect(screen.getByText('Test Task')).toBeInTheDocument();
  // checkbox toggle
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(onToggle).toHaveBeenCalled();

  // delete
  const deleteBtn = screen.getByText('Hapus');
  fireEvent.click(deleteBtn);
  expect(onDelete).toHaveBeenCalled();

  // edit
  const editBtn = screen.getByText('Edit');
  fireEvent.click(editBtn);
  expect(onUpdate).toHaveBeenCalled();
});
