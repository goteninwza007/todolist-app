# Todo List App

A full-stack Todo application built with React + Go/Gin + PostgreSQL, containerized with Docker Compose.


## Video Walkthrough

A walkthrough of the project explaining the code structure, architecture decisions, and development process.

Watch here: https://drive.google.com/file/d/1wTP9isW9AyG0N3JQ4xJWwZHVdFGdkC09/view

## Tech Stack

### Client
- **React** + **TypeScript** — Functional components throughout
- **Vite** — Fast dev server and build tool
- **Tailwind CSS** — Utility-first styling
- **React Context API** + **useReducer** — Global state management
- **React Hook Form** + **Zod** — Form handling and validation
- **pnpm** — Package manager

### Server
- **Go** + **Gin** — REST API
- **GORM** — ORM with AutoMigrate
- **PostgreSQL** — Database

### Infrastructure
- **Docker Compose** — Single command to run everything

---

## Getting Started

### Prerequisites
- Docker + Docker Compose
- Node.js + pnpm (for local client development)

### 1. Setup environment variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env` if needed. The default values work out of the box with Docker Compose.

### 2. Run everything with Docker

```bash
docker compose up --build
```

- Client → http://localhost:3000
- Server → http://localhost:8080/api/todos

### Run client locally (recommended for development)

Running the client locally is recommended over Docker on Windows, as bind mounts can cause significant performance issues.

```bash
# Terminal 1 — start server + database
docker compose up server postgres

# Terminal 2 — start client locally
cd client
pnpm install
pnpm dev
```

- Client → http://localhost:3000
- Server → http://localhost:8080/api/todos

### Stop the project

```bash
docker compose down
```

### Reset database

```bash
docker compose down -v
docker compose up --build
```

---

## Project Structure

```
.
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── fetcher.ts           # HTTP utility (Get, Post, Put, Delete) with unified response type
│   │   │   └── todoApi.ts           # Todo API calls
│   │   │
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── Badge.tsx        # Reusable badge with dot indicator
│   │   │       ├── Button.tsx       # Reusable button with variants
│   │   │       ├── InputField.tsx   # Reusable input with error state
│   │   │       ├── Modal.tsx        # Reusable modal wrapper
│   │   │       ├── SelectField.tsx  # Custom dropdown select
│   │   │       ├── Spinner.tsx      # Global loading spinner modal
│   │   │       └── StatusSelector.tsx # Status-specific dropdown
│   │   │
│   │   ├── constants/
│   │   │   ├── todo.ts              # Priority, status, size config (labels, colors, dots)
│   │   │   └── todoOptions.ts       # SelectField options for size, priority, status
│   │   │
│   │   ├── context/
│   │   │   ├── LoadingContext.tsx   # Global loading state
│   │   │   └── TodoContext.tsx      # Todo state with useReducer
│   │   │
│   │   ├── scenes/
│   │   │   └── TodoList/
│   │   │       ├── components/
│   │   │       │   ├── TodoCard.tsx        # Todo card for list view
│   │   │       │   ├── TodoDetailModal.tsx # Detail view with inline status change
│   │   │       │   └── TodoForm.tsx        # Create & edit form (mode: "create" | "edit")
│   │   │       └── index.tsx              # Main scene (filter, sort, grid)
│   │   │
│   │   ├── schemas/
│   │   │   └── todoSchema.ts        # Zod schema + TodoFormValues type
│   │   │
│   │   ├── types/
│   │   │   └── todo.ts              # TypeScript types (Todo, Size, Priority, Status, etc.)
│   │   │
│   │   ├── utils/
│   │   │   ├── format.ts            # Date formatting utility
│   │   │   └── sleep.ts             # Sleep utility for minimum loading duration
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   └── Dockerfile
│
├── server/
│   ├── db/
│   │   └── db.go                    # PostgreSQL connection via GORM
│   ├── handlers/
│   │   └── todo_handler.go          # HTTP handlers (GetAll, Create, Update, Delete)
│   ├── models/
│   │   └── todo.go                  # Todo model with Size, Priority, Status types
│   ├── repository/
│   │   └── todo_repository.go       # Database queries
│   ├── routes/
│   │   └── routes.go                # Gin router setup
│   ├── main.go
│   ├── .env.example                 # Environment variable template
│   └── Dockerfile
│
└── docker-compose.yml
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create a todo |
| PUT | /api/todos/:id | Update a todo |
| DELETE | /api/todos/:id | Delete a todo |

---

## Thought Process

### Architecture
The client and server are clearly separated, managed together by Docker Compose. This allows the entire stack to run with a single command while keeping each service independent.

### State Management
React Context API + useReducer was chosen over Redux because the project scope does not require a heavy external library. Context is sufficient and easier to reason about. A separate LoadingContext was created to allow the global spinner to be triggered from anywhere in the app.

### API Layer
A fetcher utility is structured by HTTP method (Get, Post, Put, Delete), and every response is wrapped in a consistent ModifiedResponse type. This ensures uniform error handling across the entire app.

### Component Design
Components are split into two levels:
- `components/ui/` — Reusable across the entire app (Button, InputField, SelectField, Badge, Spinner, Modal, StatusSelector)
- `scenes/TodoList/components/` — Scoped to the TodoList scene only (TodoCard, TodoDetailModal, TodoForm)

`TodoForm` handles both create and edit modes via a `mode` prop, eliminating duplication between the two forms.

### Form Validation
React Hook Form + Zod was chosen because Zod allows schema definition to be the single source of truth, and TypeScript types can be inferred directly from the schema — reducing duplication between validation logic and type definitions.

### Backend
Go + Gin was chosen for its performance, simplicity, and suitability for building REST APIs. GORM with AutoMigrate handles the database schema automatically on startup, keeping the setup minimal.
