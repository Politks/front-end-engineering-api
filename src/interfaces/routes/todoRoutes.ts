import { Router } from 'express';
import { TodoController } from '../controllers/TodoController';
import { InMemoryTodoRepository } from '../../infrastructure/repositories/InMemoryTodoRepository';

const router = Router();
const todoRepository = new InMemoryTodoRepository();
const todoController = new TodoController(todoRepository);

router.post('/todos', todoController.create.bind(todoController));
router.get('/todos', todoController.list.bind(todoController));
router.put('/todos/:id', todoController.update.bind(todoController));
router.patch('/todos/:id/toggle', todoController.toggleComplete.bind(todoController));
router.delete('/todos/:id', todoController.delete.bind(todoController));

export default router; 