import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { todoRoutes } from './routes/todoRoutes';
import { InMemoryTodoRepository } from './repositories/InMemoryTodoRepository';

const app = express();
const httpServer = createServer(app);

// CORS configuration for Express
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// CORS configuration for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
  },
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Repository
const todoRepository = new InMemoryTodoRepository();

// Routes
app.use('/api/todos', todoRoutes(todoRepository));

// Socket.IO events
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Export both app and io for testing purposes
export { app, io, httpServer }; 