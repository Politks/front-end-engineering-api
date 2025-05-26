# TODO List API

A RESTful API for managing TODO items, built with Node.js, Express, and TypeScript following SOLID principles.

## Features

- Create, read, update, and delete TODO items
- Toggle TODO completion status
- RESTful API endpoints
- TypeScript support
- Clean architecture
- SOLID principles implementation
- Real-time updates using WebSocket

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the PORT environment variable.

## Building for Production

To build the project:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## API Endpoints

### Create TODO
- **POST** `/api/todos`
- Body:
```json
{
  "title": "Task title",
  "description": "Task description"
}
```

### List TODOs
- **GET** `/api/todos`

### Update TODO
- **PUT** `/api/todos/:id`
- Body:
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

### Toggle TODO Completion
- **PATCH** `/api/todos/:id/toggle`

### Delete TODO
- **DELETE** `/api/todos/:id`

## WebSocket Events

The API uses Socket.IO for real-time updates. Here's how to connect and listen to events:

### Client Setup

```javascript
// Install Socket.IO client
npm install socket.io-client

// Connect to WebSocket server
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Listen for events
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

// TODO Events
socket.on('todo:created', (todo) => {
  console.log('New TODO created:', todo);
  // Update your UI accordingly
});

socket.on('todo:updated', (todo) => {
  console.log('TODO updated:', todo);
  // Update your UI accordingly
});

socket.on('todo:deleted', (id) => {
  console.log('TODO deleted:', id);
  // Remove the TODO from your UI
});

socket.on('todo:toggled', (todo) => {
  console.log('TODO completion toggled:', todo);
  // Update the TODO's completion status in your UI
});
```

### Available Events

- `todo:created` - Emitted when a new TODO is created
  - Payload: The created TODO object
- `todo:updated` - Emitted when a TODO is updated
  - Payload: The updated TODO object
- `todo:deleted` - Emitted when a TODO is deleted
  - Payload: The ID of the deleted TODO
- `todo:toggled` - Emitted when a TODO's completion status is toggled
  - Payload: The updated TODO object

### Example: React Component

```jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    // Listen for real-time updates
    socket.on('todo:created', (todo) => {
      setTodos(prev => [...prev, todo]);
    });

    socket.on('todo:updated', (updatedTodo) => {
      setTodos(prev => prev.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      ));
    });

    socket.on('todo:deleted', (id) => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    });

    socket.on('todo:toggled', (toggledTodo) => {
      setTodos(prev => prev.map(todo => 
        todo.id === toggledTodo.id ? toggledTodo : todo
      ));
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Your TODO list UI */}
    </div>
  );
}
```

## Project Structure

```
src/
├── domain/           # Domain entities and interfaces
├── application/      # Use cases and business logic
├── infrastructure/   # External implementations (repositories, etc.)
├── interfaces/       # Controllers and routes
└── config/          # Configuration files
```

## Architecture

This project follows Clean Architecture principles and SOLID design principles:

- **Single Responsibility Principle**: Each class has a single responsibility
- **Open/Closed Principle**: The system is open for extension but closed for modification
- **Liskov Substitution Principle**: Subtypes can be used in place of their parent types
- **Interface Segregation Principle**: Clients only depend on the interfaces they use
- **Dependency Inversion Principle**: High-level modules don't depend on low-level modules
