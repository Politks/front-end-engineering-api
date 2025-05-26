import { ITodoRepository } from '../../domain/repositories/ITodoRepository';

export class DeleteTodoUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<boolean> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      return false;
    }

    await this.todoRepository.delete(id);
    return true;
  }
} 