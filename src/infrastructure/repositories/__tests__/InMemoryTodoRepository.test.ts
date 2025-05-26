import { InMemoryTodoRepository } from '../InMemoryTodoRepository';
import { Todo } from '../../../domain/entities/Todo';

describe('InMemoryTodoRepository', () => {
  let repository: InMemoryTodoRepository;
  let mockTodo: Todo;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
    mockTodo = new Todo({
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it('should create a todo', async () => {
    const createdTodo = await repository.create(mockTodo);
    expect(createdTodo).toEqual(mockTodo);
  });

  it('should find a todo by id', async () => {
    await repository.create(mockTodo);
    const foundTodo = await repository.findById(mockTodo.id);
    expect(foundTodo).toEqual(mockTodo);
  });

  it('should return null when todo is not found', async () => {
    const foundTodo = await repository.findById('non-existent-id');
    expect(foundTodo).toBeNull();
  });

  it('should find all todos', async () => {
    const todo2 = new Todo({
      id: '2',
      title: 'Test Todo 2',
      description: 'Test Description 2',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repository.create(mockTodo);
    await repository.create(todo2);

    const todos = await repository.findAll();
    expect(todos).toHaveLength(2);
    expect(todos).toContainEqual(mockTodo);
    expect(todos).toContainEqual(todo2);
  });

  it('should update a todo', async () => {
    await repository.create(mockTodo);
    
    const updatedTodo = new Todo({
      id: mockTodo.id,
      title: 'Updated Title',
      description: 'Updated Description',
      completed: mockTodo.completed,
      createdAt: mockTodo.createdAt,
      updatedAt: new Date(),
    });

    const result = await repository.update(updatedTodo);
    expect(result).toEqual(updatedTodo);

    const foundTodo = await repository.findById(mockTodo.id);
    expect(foundTodo).toEqual(updatedTodo);
  });

  it('should delete a todo', async () => {
    await repository.create(mockTodo);
    await repository.delete(mockTodo.id);

    const foundTodo = await repository.findById(mockTodo.id);
    expect(foundTodo).toBeNull();
  });
}); 