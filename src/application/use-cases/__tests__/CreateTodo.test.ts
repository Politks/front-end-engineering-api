import { CreateTodoUseCase } from '../CreateTodo';
import { ITodoRepository } from '../../../domain/repositories/ITodoRepository';
import { Todo } from '../../../domain/entities/Todo';

describe('CreateTodoUseCase', () => {
  let createTodoUseCase: CreateTodoUseCase;
  let mockTodoRepository: jest.Mocked<ITodoRepository>;

  beforeEach(() => {
    mockTodoRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    createTodoUseCase = new CreateTodoUseCase(mockTodoRepository);
  });

  it('should create a new todo', async () => {
    const todoData = {
      title: 'Test Todo',
      description: 'Test Description',
    };

    const mockTodo = new Todo({
      id: '1',
      title: todoData.title,
      description: todoData.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockTodoRepository.create.mockResolvedValue(mockTodo);

    const result = await createTodoUseCase.execute(todoData);

    expect(mockTodoRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Todo);
    expect(result.title).toBe(todoData.title);
    expect(result.description).toBe(todoData.description);
    expect(result.completed).toBe(false);
  });
}); 