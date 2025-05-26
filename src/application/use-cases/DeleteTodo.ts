import { ITodoRepository } from '../../domain/repositories/ITodoRepository';

export class DeleteTodoUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    
    if (!todo) {
      throw new Error('Todo not found');
    }

    await this.todoRepository.delete(id);
  }
} 