import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Todo } from '../../domain/entities/Todo';

export class WebSocketService {
  private io: SocketIOServer;
  private connectedClients: Set<string> = new Set();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      },
      pingTimeout: 60000,
      pingInterval: 25000,
      connectTimeout: 10000,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      this.connectedClients.add(socket.id);

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      socket.on('disconnect', (reason) => {
        console.log('Client disconnected:', socket.id, 'Reason:', reason);
        this.connectedClients.delete(socket.id);
      });

      // Handle client errors
      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
    });

    // Handle server errors
    this.io.engine.on('connection_error', (error) => {
      console.error('Server connection error:', error);
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

  public getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }

  public close(): void {
    this.io.close();
    this.connectedClients.clear();
  }
} 