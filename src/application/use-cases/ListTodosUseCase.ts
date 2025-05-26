import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';

export class ListTodosUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
} 