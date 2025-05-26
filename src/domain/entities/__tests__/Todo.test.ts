import { Todo } from '../Todo';

describe('Todo Entity', () => {
  const mockTodoProps = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create a todo with correct properties', () => {
    const todo = new Todo(mockTodoProps);

    expect(todo.id).toBe(mockTodoProps.id);
    expect(todo.title).toBe(mockTodoProps.title);
    expect(todo.description).toBe(mockTodoProps.description);
    expect(todo.completed).toBe(mockTodoProps.completed);
    expect(todo.createdAt).toBe(mockTodoProps.createdAt);
    expect(todo.updatedAt).toBe(mockTodoProps.updatedAt);
  });

  it('should toggle completion status', () => {
    const todo = new Todo(mockTodoProps);
    const initialStatus = todo.completed;

    todo.toggleComplete();

    expect(todo.completed).toBe(!initialStatus);
  });

  it('should update title and description', () => {
    const todo = new Todo(mockTodoProps);
    const newTitle = 'Updated Title';
    const newDescription = 'Updated Description';

    todo.update(newTitle, newDescription);

    expect(todo.title).toBe(newTitle);
    expect(todo.description).toBe(newDescription);
  });
}); 