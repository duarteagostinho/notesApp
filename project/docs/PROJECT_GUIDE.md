# Project Guide

This project is a small notepad app built to show a full stack workflow.

## What The Project Does

- create a notepad
- list notepads
- read one notepad by id
- expose the same data through a web app and a CLI

## Main Pieces

- React frontend
- FastAPI backend
- SQL database through SQLAlchemy
- Ruby CLI
- Docker for local running and packaging
- GitHub Actions for CI and deploy
- AWS EC2 for hosting

## Runtime Order

When you open the web app:
1. The browser loads React.
2. React renders `App.jsx`.
3. `App.jsx` asks the backend for notepads.
4. The backend gets the request in FastAPI.
5. FastAPI validates the data.
6. SQLAlchemy talks to the database.
7. The database returns rows.
8. The backend sends JSON back.
9. React shows the data on screen.

When you use the CLI:
1. You run `notepad <id>`.
2. Ruby reads the id.
3. Ruby calls the backend API.
4. The backend reads the database.
5. Ruby prints the notepad in the terminal.

## Backend Files

### `project/backend/app/main.py`
This is the app entry point.

What it does:
- creates the FastAPI app
- enables CORS
- creates tables on startup
- adds the `notepads` router
- exposes `GET /health`

Important idea:
- this file starts the application and wires everything together

### `project/backend/app/routes/notepads.py`
This file defines HTTP endpoints.

Endpoints:
- `POST /notepads`
- `GET /notepads`
- `GET /notepads/{notepad_id}`

Important idea:
- this file handles web requests, not database logic

### `project/backend/app/schemas.py`
This file defines API data shapes.

Classes:
- `NotepadBase`
- `NotepadCreate`
- `NotepadRead`

Important idea:
- a schema defines what input/output should look like

### `project/backend/app/models.py`
This file defines the SQLAlchemy model.

Model:
- `Notepad`

Fields:
- `id`
- `title`
- `content`

Important idea:
- this is the Python version of the database table

### `project/backend/app/crud.py`
This file contains database operations.

Functions:
- `create_notepad()`
- `list_notepads()`
- `get_notepad()`

Important idea:
- CRUD is where the app talks to the database

### `project/backend/app/db.py`
This file configures database access.

It defines:
- `DATABASE_URL`
- `engine`
- `SessionLocal`
- `get_db()`

Important idea:
- a session is the temporary connection used to query the database

## Frontend Files

### `project/frontend/src/main.jsx`
This is the React entry point.

What it does:
- finds the `root` HTML element
- mounts the `App` component

### `project/frontend/src/App.jsx`
This is the main UI component.

What it does:
- stores local state
- loads notepads when the page opens
- handles the form
- renders the list of notes

Important state:
- `notepads`
- `form`
- `error`
- `loading`

### `project/frontend/src/api.js`
This file contains HTTP calls.

Functions:
- `fetchNotepads()`
- `createNotepad()`

Important idea:
- keep API calls separate from UI code

### `project/frontend/package.json`
This file defines the frontend project.

It contains:
- scripts
- dependencies
- Node version requirement

### `project/frontend/vite.config.js`
This configures Vite for development.

Important idea:
- Vite is the frontend dev server and build tool

### `project/frontend/nginx.conf`
This is used in production.

It does two jobs:
- serves the React build files
- forwards `/api` to the backend

## CLI Files

### `project/cli/bin/notepad`
This is the command you run.

Example:
```bash
notepad 1
```

What it does:
- reads the argument
- calls the Ruby client
- prints the result

### `project/cli/lib/notepads.rb`
This file contains the Ruby HTTP client.

Class:
- `Notepads::Client`

What it does:
- sends `GET /notepads/{id}`
- parses JSON
- handles errors

### `project/cli/lib/client.rb`
Small helper entry file.

What it does:
- loads the main Ruby module

### `project/cli/notepads.gemspec`
This file defines the Ruby package metadata.

What it does:
- names the gem
- declares the executable
- declares dependencies

## Docker Files

### `project/backend/Dockerfile`
Builds the backend image.

### `project/frontend/Dockerfile`
Builds the frontend dev image.

### `project/frontend/Dockerfile.prod`
Builds the frontend production image.

### `project/infra/docker-compose.yml`
Local development stack.

Services:
- `db`
- `backend`
- `frontend`

### `project/infra/docker-compose.prod.yml`
Production stack for EC2.

Differences from dev:
- frontend runs on Nginx
- backend is internal only
- database uses a persistent volume

## CI And Deploy

### `.github/workflows/ci.yml`
Runs on push and pull request.

Checks:
- backend tests
- frontend build

### `.github/workflows/deploy.yml`
Runs on push to `main`.

What it does:
- SSH into EC2
- pull latest code
- run production compose stack

## Important Concepts

### API
A way for programs to talk to each other over HTTP.

### Endpoint
A specific URL path like `/notepads`.

### Schema
A description of what data should look like.

### Model
A Python class that represents a database table.

### CRUD
Create, Read, Update, Delete.

### Session
One database conversation.

### CORS
A browser rule that can block frontend-backend requests across origins.

### Docker
A way to package apps and dependencies into containers.

### CI/CD
Automation for tests and deployment.

## Real Data Flow

### Create Notepad
1. React collects input.
2. React sends JSON to the backend.
3. FastAPI validates the JSON.
4. CRUD creates a SQLAlchemy object.
5. SQLAlchemy saves it.
6. The backend returns the saved object.
7. React refreshes the list.

### Read Notepad In CLI
1. Ruby gets the id.
2. Ruby calls the API.
3. FastAPI reads from the database.
4. Ruby prints the data.

## How To Read The Project

Read in this order:
1. `project/backend/app/main.py`
2. `project/backend/app/routes/notepads.py`
3. `project/backend/app/schemas.py`
4. `project/backend/app/models.py`
5. `project/backend/app/crud.py`
6. `project/backend/app/db.py`
7. `project/frontend/src/main.jsx`
8. `project/frontend/src/App.jsx`
9. `project/frontend/src/api.js`
10. `project/cli/bin/notepad`
11. `project/cli/lib/notepads.rb`

## What To Remember

- React is the UI
- FastAPI is the backend
- SQLAlchemy is the DB layer
- Ruby CLI is a terminal client
- Docker packages the stack
- GitHub Actions automates checks
- AWS hosts the app
