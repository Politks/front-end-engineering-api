import { Router } from 'express';
import { TodoController } from '../controllers/TodoController';
import { InMemoryTodoRepository } from '../../infrastructure/repositories/InMemoryTodoRepository';
import { WebSocketService } from '../../infrastructure/websocket/WebSocketService';

const router = Router();
const todoRepository = new InMemoryTodoRepository();

// Get WebSocket service from app
const getWebSocketService = (req: any): WebSocketService => {
  return req.app.get('webSocketService');
};

// Create controller with WebSocket service
const createController = (req: any) => {
  const webSocketService = getWebSocketService(req);
  return new TodoController(todoRepository, webSocketService);
};

router.post('/todos', (req, res) => createController(req).create(req, res));
router.get('/todos', (req, res) => createController(req).list(req, res));
router.put('/todos/:id', (req, res) => createController(req).update(req, res));
router.patch('/todos/:id/toggle', (req, res) => createController(req).toggleComplete(req, res));
router.delete('/todos/:id', (req, res) => createController(req).delete(req, res));

export default router; 