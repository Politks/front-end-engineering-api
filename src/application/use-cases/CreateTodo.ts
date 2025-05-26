import { Todo } from '../../domain/entities/Todo';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { v4 as uuidv4 } from 'uuid';

interface CreateTodoDTO {
  title: string;
  description: string;
}

export class CreateTodoUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(data: CreateTodoDTO): Promise<Todo> {
    const todo = new Todo({
      id: uuidv4(),
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.todoRepository.create(todo);
  }
} 