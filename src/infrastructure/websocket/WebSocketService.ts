import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Todo } from '../../domain/entities/Todo';

export class WebSocketService {
  private io: SocketIOServer;

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  public emitTodoCreated(todo: Todo): void {
    this.io.emit('todo:created', todo);
  }

  public emitTodoUpdated(todo: Todo): void {
    this.io.emit('todo:updated', todo);
  }

  public emitTodoDeleted(id: string): void {
    this.io.emit('todo:deleted', id);
  }

  public emitTodoToggled(todo: Todo): void {
    this.io.emit('todo:toggled', todo);
  }
} 