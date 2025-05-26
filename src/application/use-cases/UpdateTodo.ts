import { Todo } from '../../domain/entities/Todo';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';

interface UpdateTodoDTO {
  id: string;
  title: string;
  description: string;
}

export class UpdateTodoUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(data: UpdateTodoDTO): Promise<Todo> {
    const todo = await this.todoRepository.findById(data.id);
    
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.update(data.title, data.description);
    return await this.todoRepository.update(todo);
  }
} 