import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import todoRoutes from './interfaces/routes/todoRoutes';
import { WebSocketService } from './infrastructure/websocket/WebSocketService';

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

// Initialize WebSocket
const webSocketService = new WebSocketService(httpServer);

// Make WebSocket service available globally
app.set('webSocketService', webSocketService);

app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 