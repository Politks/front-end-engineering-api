import { Todo } from '../../domain/entities/Todo';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';

export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Map<string, Todo> = new Map();

  async findAll(): Promise<Todo[]> {
    return Array.from(this.todos.values());
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.get(id) || null;
  }

  async create(todo: Todo): Promise<Todo> {
    this.todos.set(todo.id, todo);
    return todo;
  }

  async update(todo: Todo): Promise<Todo> {
    this.todos.set(todo.id, todo);
    return todo;
  }

  async delete(id: string): Promise<void> {
    this.todos.delete(id);
  }
} 