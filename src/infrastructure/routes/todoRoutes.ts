import { Router } from 'express';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { CreateTodoUseCase } from '../../application/use-cases/CreateTodoUseCase';
import { GetTodoUseCase } from '../../application/use-cases/GetTodoUseCase';
import { ListTodosUseCase } from '../../application/use-cases/ListTodosUseCase';
import { UpdateTodoUseCase } from '../../application/use-cases/UpdateTodoUseCase';
import { DeleteTodoUseCase } from '../../application/use-cases/DeleteTodoUseCase';
import { io } from '../server';

export const todoRoutes = (todoRepository: ITodoRepository) => {
  const router = Router();

  // Create Todo
  router.post('/', async (req, res) => {
    try {
      const createTodoUseCase = new CreateTodoUseCase(todoRepository);
      const todo = await createTodoUseCase.execute(req.body);
      io.emit('todo:created', todo);
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // Get Todo by ID
  router.get('/:id', async (req, res) => {
    try {
      const getTodoUseCase = new GetTodoUseCase(todoRepository);
      const todo = await getTodoUseCase.execute(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // List all Todos
  router.get('/', async (req, res) => {
    try {
      const listTodosUseCase = new ListTodosUseCase(todoRepository);
      const todos = await listTodosUseCase.execute();
      res.json(todos);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // Update Todo
  router.put('/:id', async (req, res) => {
    try {
      const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
      const todo = await updateTodoUseCase.execute(req.params.id, req.body);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      io.emit('todo:updated', todo);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // Delete Todo
  router.delete('/:id', async (req, res) => {
    try {
      const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
      const success = await deleteTodoUseCase.execute(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      io.emit('todo:deleted', req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  return router;
}; 