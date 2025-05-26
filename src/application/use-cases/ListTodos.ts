import { Todo } from '../../domain/entities/Todo';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';

export class ListTodosUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }
} 