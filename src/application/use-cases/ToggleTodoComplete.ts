import { Todo } from '../../domain/entities/Todo';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';

export class ToggleTodoCompleteUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.toggleComplete();
    return await this.todoRepository.update(todo);
  }
} 