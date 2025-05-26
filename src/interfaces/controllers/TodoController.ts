import { Request, Response } from 'express';
import { CreateTodoUseCase } from '../../application/use-cases/CreateTodo';
import { ListTodosUseCase } from '../../application/use-cases/ListTodos';
import { UpdateTodoUseCase } from '../../application/use-cases/UpdateTodo';
import { ToggleTodoCompleteUseCase } from '../../application/use-cases/ToggleTodoComplete';
import { DeleteTodoUseCase } from '../../application/use-cases/DeleteTodo';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';

export class TodoController {
  private createTodoUseCase: CreateTodoUseCase;
  private listTodosUseCase: ListTodosUseCase;
  private updateTodoUseCase: UpdateTodoUseCase;
  private toggleTodoCompleteUseCase: ToggleTodoCompleteUseCase;
  private deleteTodoUseCase: DeleteTodoUseCase;

  constructor(todoRepository: ITodoRepository) {
    this.createTodoUseCase = new CreateTodoUseCase(todoRepository);
    this.listTodosUseCase = new ListTodosUseCase(todoRepository);
    this.updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
    this.toggleTodoCompleteUseCase = new ToggleTodoCompleteUseCase(todoRepository);
    this.deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description } = req.body;
      const todo = await this.createTodoUseCase.execute({ title, description });
      return res.status(201).json(todo);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const todos = await this.listTodosUseCase.execute();
      return res.json(todos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const todo = await this.updateTodoUseCase.execute({ id, title, description });
      return res.json(todo);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async toggleComplete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const todo = await this.toggleTodoCompleteUseCase.execute(id);
      return res.json(todo);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteTodoUseCase.execute(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
} 