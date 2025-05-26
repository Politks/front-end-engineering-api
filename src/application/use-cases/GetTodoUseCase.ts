import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';

export class GetTodoUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }
} 