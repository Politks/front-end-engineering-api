import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';

interface UpdateTodoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}

export class UpdateTodoUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(id: string, data: UpdateTodoDTO): Promise<Todo | null> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      return null;
    }

    if (data.title) {
      todo.updateTitle(data.title);
    }
    if (data.description) {
      todo.updateDescription(data.description);
    }
    if (typeof data.completed === 'boolean') {
      todo.toggleComplete();
    }

    return this.todoRepository.update(todo);
  }
} 