# Docker Instructions (Simple)

Follow these minimal steps to start, stop, and reset the app with Docker.

## Prerequisites

- Docker Desktop with Docker Compose (v2+)

## First-time setup (only once per machine)

- Backend env: ensure `backend/.env` exists (copy from `backend/.env.sample`).
- Frontend env: ensure `frontend/.env` contains:
  ```
  VITE_API_URL=http://localhost:5050/api
  ```

## Start (detached)

```bash
# standard hot-reload (recommended)
docker compose up -d

# optional: enhanced file watching (Compose 2.22+)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

- Frontend: http://localhost:5174
- Backend health: http://localhost:5050/health

Code changes in `frontend/src` and `backend/src` are auto-reloaded (no rebuild needed).

## Stop

```bash
docker compose stop
```

## Full stop & remove containers

```bash
docker compose down
```

## Reset (drop database data)

```bash
# stop & remove containers + named volumes (drops DB)
docker compose down -v

# start fresh again
docker compose up -d

# run migrations & seed inside backend container (first run only)
docker exec -it ewm-backend sh -lc 'npx prisma migrate dev && npm run seed'
```

## Rebuild images (only if Dockerfile or dependencies changed)

```bash
docker compose build backend frontend
docker compose up -d
```

## Useful

```bash
# view live logs
docker compose logs -f backend
docker compose logs -f frontend

# container status
docker ps --filter name=ewm-
```

## Ports (host → container)

- Backend: 5050 → 5000
- Frontend: 5174 → 5173
- Postgres: 5433 → 5432

## Troubleshooting (quick)

- Port already in use: stop the app using that port or adjust `docker-compose.yml` mapping.
- DB not ready: wait a few seconds; backend waits for DB health.
- Prisma engine error: rebuild backend image `docker compose build backend`.
- HMR not updating: ensure containers are running with volumes; try restarting the affected service.
