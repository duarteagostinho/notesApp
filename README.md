# NotesApp

Full-stack notes app with a React frontend, FastAPI backend, PostgreSQL database, Ruby CLI, Docker, and GitHub Actions deployment to AWS EC2.

## Live Demo

- Web app: http://16.170.224.183

## Overview

This project lets you create, list, and read notepads through a web UI and a CLI.

## Stack

- Frontend: React + Vite
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL
- CLI: Ruby
- Containers: Docker + Docker Compose
- CI/CD: GitHub Actions
- Hosting: AWS EC2

## Features

- Create a notepad
- List saved notepads
- Read a notepad by ID
- Web app and CLI use the same backend API

## Project Structure

- `backend/` FastAPI app and database layer
- `frontend/` React app
- `cli/` Ruby command-line client
- `infra/` Docker Compose files for local and production
- `.github/workflows/` CI and deploy workflows

## Local Development

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### CLI

```bash
cd cli
bundle install
```

Then run:

```bash
notepad 1
```

## Docker

### Local stack

```bash
cd infra
docker compose up -d --build
```

This starts:
- PostgreSQL on port `5432`
- FastAPI backend on port `8000`
- React frontend on port `5173`

### Production stack

```bash
cd infra
docker compose -f docker-compose.prod.yml up -d --build
```

This exposes the app on port `80`.

## GitHub Actions

### CI

`.github/workflows/ci.yml` runs:
- backend tests with `pytest`
- frontend build with `npm run build`

### Deploy

`.github/workflows/deploy.yml` deploys to AWS EC2 on push to `main`.

Required secrets:
- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`
- `EC2_SSH_PORT`
- `EC2_APP_DIR`

## AWS EC2 Setup

To expose the app publicly:
- create an EC2 instance
- open port `22` for SSH
- open port `80` for HTTP
- install Docker and Docker Compose
- clone the repo on the instance
- configure the GitHub Actions secrets

## API

The backend exposes endpoints to:
- create a notepad
- list notepads
- read a notepad by ID

## Notes

- Notes are shared across users because there is no authentication layer.
- The frontend is served through Nginx in production.
